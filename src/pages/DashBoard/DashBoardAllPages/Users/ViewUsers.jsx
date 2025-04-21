
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


const ViewUsers = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); 
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const url = searchTerm ? `/searchUsers?q=${encodeURIComponent(searchTerm)}` : '/users';
            const res = await axiosSecure.get(url);
            return res.data;
        },
    });

    const updateUserRole = (email) => {
        axiosSecure.put(`/users/${email}`, { role: selectedRole })
            .then(() => {
                refetch(); 
                // Swal.fire({
                //     title: "Role Updated Successfully",
                //     icon: "success"
                // });
            })
            .catch(error => {
                console.error('Error updating user role:', error);
                // Swal.fire({
                //     title: "Error!",
                //     text: "Failed to update user role.",
                //     icon: "error"
                // });
            });
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.role);
        document.getElementById('my_modal_3').showModal();
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div className='min-h-screen mb-4'>
            <Helmet>
                <title>Users | TuToria</title>
            </Helmet>
            <h1 className="pt-20 text-center font-bold text-3xl">Users</h1>

            <div className="flex justify-center mt-4 mb-4">
                <input
                    type="text"
                    className="border px-4 py-2"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <table className="w-[95%] mx-auto text-[9px] md:text-[16px] text-center md:min-w-full">
                <thead>
                    <tr>
                        <th className=" py-2 ">Photo</th>
                        <th className=" py-2 ">Name</th>
                        <th className=" py-2 ">Email</th>
                        <th className="py-2 ">Role</th>
                        <th className=" py-2 ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2 flex justify-center">
                                <img src={user.photoURL} className='w-[40px] h-[36px] md:w-[40px] md:h-[40px] rounded-full' alt={`${user.name}'s profile`} />
                            </td>
                            <td className="border py-2">{user.name}</td>
                            <td className="border  py-2">{user.email}</td>
                            <td className="border  py-2">{user.role}</td>
                            
                            <td className="border  py-2">
                                {/* {user.role !== 'admin' && ( */}
                                    <button
                                        onClick={() => openModal(user)}
                                        className="btn px-4 py-2 bg-[#f9d045]  rounded hover:bg-[#e7bd34] text-[9px] md:text-[16px]"
                                    >
                                        Update Role
                                    </button>
                                {/* )} */}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    {selectedUser && (
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
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
                                            document.getElementById('my_modal_3').close();
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