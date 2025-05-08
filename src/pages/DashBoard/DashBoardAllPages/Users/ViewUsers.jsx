import {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCircle, FaBan } from "react-icons/fa";
import Swal from "sweetalert2";


const ViewUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();
  

  const {
    data: users = [],
    isLoading,
    isError,
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
      title: `Are you sure you want to ${isBanning ? "ban" : "unban"} this user?`,
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
          const res = await axiosSecure.delete(`/users/${email}`);
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

  const openModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    document.getElementById("my_modal_3").showModal();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen mb-2">
      <Helmet>
        <title>Users | TuToria</title>
      </Helmet>
      <h1 className="pt-10 text-center font-bold text-3xl">Users</h1>

      <div className="relative w-full flex justify-center items-center mt-4 mb-4">
        <input
          type="text"
          className="border px-4 py-2"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="absolute right-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1"
          onClick={() => {
            Swal.fire(
              "Info",
              "Add User functionality not implemented yet",
              "info"
            );
          }}
        >
          <FaPlus /> Add User
        </button>
      </div>

      <table className="w-[80%] mx-auto text-[9px] md:text-[16px] text-center md:min-w-full">
        <thead>
          <tr>
            <th className=" py-2 ">Photo</th>
            <th className=" py-2 ">Name</th>
            <th className=" py-2 ">Email</th>
            <th className=" py-2 ">Role</th>
            <th className=" py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
              <td className="border  py-2 text-blue-700">{user.email}</td>
              <td className="border  py-2">{user.role}</td>

              <td className="border py-2">
                <div className="flex justify-around items-center">
                  <button
                    onClick={() => openModal(user)}
                    className="px-4 py-2 bg-[#f9d045] rounded hover:bg-[#e7bd34] text-[9px] md:text-[16px]"
                  >
                    Update Role
                  </button>
       


<button
  type="button"
  className={`border-2 border-gray-400 rounded-full ${
    user.banned === "yes" ? "bg-red-100 text-red-600" : "bg-gray-500 text-white"
  } hover:bg-red-200 flex items-center justify-center transition`}
  title={user.banned === "yes" ? "Click to Unban" : "Click to Ban"}
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

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {selectedUser && (
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Update User Role</h3>
              <div className="py-4">
                <label htmlFor="role">Select Role:</label>
                <select
                  className="m-4 border px-3 py-2"
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
                  className="btn px-4 py-2 bg-[#f9d045]  rounded hover:bg-[#e7bd34]"
                  onClick={() => {
                    updateUserRole(selectedUser.email);
                    document.getElementById("my_modal_3").close();
                  }}
                >
                  Update Role
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ViewUsers;
