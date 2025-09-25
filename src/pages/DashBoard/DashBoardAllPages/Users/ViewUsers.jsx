
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaTrash, FaCircle, FaBan, FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";

const ViewUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [zoom, setZoom] = useState(1);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openIdentityModal, setOpenIdentityModal] = useState(false);

  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const url = searchTerm
        ? `/searchUsers?q=${encodeURIComponent(searchTerm)}`
        : "/users";
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  // === Filtering Logic ===
  const filteredUsers = users.filter((user) => {
    if (filterRole === "all") return true;
    if (filterRole === "tutor") return user.role === "tutor";
    if (filterRole === "student") return user.role === "student";
    if (filterRole === "premium-tutor")
      return user.role === "tutor" && user.profileStatus === "Premium";
    if (filterRole === "premium-student")
      return user.role === "student" && user.profileStatus === "Premium";
    return true;
  });

  const updateUserRole = (email) => {
    axiosSecure
      .put(`/users/${email}`, { role: selectedRole })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
  };

  const toggleBanStatus = (email, currentStatus) => {
    const isBanning = currentStatus === "no";
    Swal.fire({
      title: `Are you sure you want to ${
        isBanning ? "ban" : "unban"
      } this user?`,
      text: `This action can be reversed later.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${isBanning ? "ban" : "unban"}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/users/${email}`, { banned: isBanning ? "yes" : "no" })
          .then(() => {
            refetch();
            Swal.fire({
              title: `${isBanning ? "Banned" : "Unbanned"}!`,
              text: `User has been ${isBanning ? "banned" : "unbanned"}.`,
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error updating user ban status:", error);
            Swal.fire({
              title: "Error!",
              text: `Failed to ${isBanning ? "ban" : "unban"} the user.`,
              icon: "error",
            });
          });
      }
    });
  };

  const deleteUser = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${email}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error",
          });
        }
      }
    });
  };

  const openUpdateModalHandler = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setOpenUpdateModal(true);
  };

  const openIdentityModalHandler = (user) => {
    setSelectedUser(user);
    setZoom(1);
    setOpenIdentityModal(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleZoomIn = () => setZoom((prev) => prev + 0.2);
  const handleZoomOut = () => setZoom((prev) => Math.max(1, prev - 0.2));

  const handleDownload = async (nidImage, name) => {
    try {
      const response = await fetch(nidImage, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}_NID.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };


    if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-2">
      <Helmet>
        <title>Users | TuToria</title>
      </Helmet>
      <h1 className="pt-6 text-center font-bold text-3xl">Users</h1>

      <div className="relative w-full flex justify-center items-center mt-4 mb-4">
        <input
          type="text"
          className="border px-4 py-2"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="absolute right-5 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
        >
          <option value="all">All</option>
          <option value="tutor">Tutors</option>
          <option value="student">Students</option>
          <option value="premium-tutor">Premium Tutors</option>
          <option value="premium-student">Premium Students</option>
        </select>
      </div>

      <table className="w-[80%] mx-auto text-[9px] md:text-[16px] text-center md:min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">Photo</th>
            <th className="py-2">Name</th>
            <th className="py-2">Identity</th>
            <th className="py-2">Role</th>
            <th className="py-2">Profile Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="border py-4">
                <div className="flex justify-center items-center">
                  <img
                    src={user.photoURL}
                    className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full"
                    alt={`${user.name}'s profile`}
                  />
                </div>
              </td>
              <td className="border py-2">{user.name}</td>

              {/* Identity Button */}
              <td className="border py-2">
                <button
                  className="px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => openIdentityModalHandler(user)}
                >
                  Identity
                </button>
              </td>

              <td className="border py-2">{user.role}</td>
              <td className="border py-2">{user.profileStatus}</td>

              <td className="border py-2">
                <div className="flex justify-around items-center">
                  <button
                    onClick={() => openUpdateModalHandler(user)}
                    className="px-4 bg-[#f9d045] rounded hover:bg-[#e7bd34] text-[9px] md:text-[16px]"
                  >
                    Update Role
                  </button>

                  <button
                    type="button"
                    className={`border-2 border-green-400 rounded-full ${
                      user.banned === "yes"
                        ? " text-red-600 border-none text-xl"
                        : "text-white"
                    } flex items-center justify-center transition`}
                    title={
                      user.banned === "yes" ? "Click to Unban" : "Click to Ban"
                    }
                    onClick={() => toggleBanStatus(user.email, user.banned)}
                  >
                    {user.banned === "yes" ? <FaBan /> : <FaCircle />}
                  </button>

                  <button
                    type="button"
                    className="text-xl text-red-600 rounded flex items-center gap-1"
                    title={"Delete User"}
                    onClick={() => deleteUser(user.email)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Role Modal */}
      {openUpdateModal && selectedUser && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setOpenUpdateModal(false)}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Update User Role</h3>
              <div className="py-4">
                <label htmlFor="role">Select Role:</label>
                <select
                  className="m-4 border px-3 py-1"
                  name="role"
                  value={selectedRole}
                  onChange={(event) => setSelectedRole(event.target.value)}
                >
                  <option value="tutor">tutor</option>
                  <option value="student">student</option>
                  <option value="admin">admin</option>
                </select>

                <button
                  type="button"
                  className="py-1 px-4  bg-[#f9d045] rounded hover:bg-[#e7bd34]"
                  onClick={() => {
                    updateUserRole(selectedUser.email);
                    setOpenUpdateModal(false);
                  }}
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Identity Viewer Modal */}
      {openIdentityModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] h-[90%] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-xl">Identity Info</h3>
              <button
                onClick={() => setOpenIdentityModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row">
              <div className="p-4 lg:w-[28%] border-b lg:border-b-0 lg:border-r">
                <p className="text-lg">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedUser.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedUser.email}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">phone:</span>{" "}
                  {selectedUser.phone}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">ID:</span>{" "}
                  {selectedUser.customId}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Role:</span>{" "}
                  {selectedUser.role}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleZoomIn}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                  {selectedUser.NidImage && (
                    <button
                      onClick={() =>
                        handleDownload(selectedUser.NidImage, selectedUser.name)
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      <FaDownload className="inline w-4 h-4 " />
                    </button>
                  )}
                </div>
              </div>

              {selectedUser.NidImage && (
                <div className="flex-1 overflow-auto m-4 border rounded-lg bg-gray-50 flex items-center justify-center">
                  <div
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "center center",
                    }}
                  >
                    <img
                      src={selectedUser.NidImage}
                      alt="NID"
                      className="block max-h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;

