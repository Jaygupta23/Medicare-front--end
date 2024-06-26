import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout/Layout';
import AdminMenu from '../../component/Layout/AdminMenu';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/auth/allUser');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    return (
        <Layout title={"Dashboard - All Users"}>
            <div style={{ marginTop: "7rem" }} >
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-md-3 px-5">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 px-5">
                            <h1 className='text-center mb-4'>All Users</h1>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                            <div className='user-list border px-4 py-2 rounded overflow-x-auto shadow'>
                                {users.length > 0 ? (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Mobile</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={user._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.address}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No users found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users;
