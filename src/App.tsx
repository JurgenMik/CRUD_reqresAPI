import React, {useEffect} from 'react';
import CreateUser from "./components/CreateUser";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import EditUser from "./components/EditUser";
import io from "socket.io-client";
import { userData } from './interfaces/Users';

function App() {

    // @ts-ignore
    const socket = io.connect(process.env.REACT_APP_SOCKET_LOCATION, {reconnection: false});

    const [users, setUsers] = React.useState<userData[]>([]);
    const [create, setCreate] = React.useState<boolean>(false);
    const [edit, setEdit] = React.useState<boolean>(false);
    const [editUser, setEditUser] = React.useState<userData>();

    useEffect(() => {
        if (!socket.connected) {
            setUsers(JSON.parse(localStorage.getItem('users') || ""));
        }
        socket.on("connect", () => {
           handleGET();
        });
    }, []);

    const handleGET = () => {
        socket.emit('get/users');
        socket.on('get/users', (data : any) => {
            setUsers(data);
            localStorage.setItem('users', JSON.stringify(data));
        });
    }

    const handleDeleteUser = (e : React.MouseEvent<HTMLTableCellElement>, data : userData) => {
        socket.emit('delete/user', data._id);
    }

    const handleCreateUser = () => {
        setCreate(!create);
    }

    const handleEditUser = (e : React.MouseEvent<HTMLTableCellElement>, data : userData) => {
        setEditUser(data);
        setEdit(!edit);
    }

    const handleSort = (e : React.MouseEvent<HTMLTableCellElement>) => {
        const sortUsers = users.sort((a, b) => a._id - b._id);
        setUsers(users.slice(users.length).concat(sortUsers));
    }

    const closeCreateModal = () => {
        setCreate(!create);
    }

    const closeEditModal = () => {
        setEdit(!edit);
    }

    return (
        <div className="h-screen w-full">
            <div className="w-2/3 h-full flex items-center justify-center m-auto overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg">
                <table className="w-full align-center text-center text-lg text-left text-gray-500 justify-center mb-20">
                    {create ? <CreateUser socket={socket} removeModal={closeCreateModal} setUsers={setUsers} users={users} /> : null}
                    {edit ? <EditUser socket={socket} removeModal={closeEditModal} editUser={editUser} setUsers={setUsers} users={users} /> : null}
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50">
                    <tr>
                        <th className="py-10 px-6 text-xl" onClick={handleSort}><FaSort className="inline-block mr-2" />
                            Id
                        </th>
                        <th className="py-10 px-6 text-xl">First_name</th>
                        <th className="py-10 px-6 text-xl">Last_name</th>
                        <th className="py-10 px-6 text-xl">Avatar</th>
                        <th className="py-10 px-6 text-xl">Action</th>
                    </tr>
                    </thead>
                    {users.map((data : any) => {
                        return (
                            <tbody key={data._id}>
                            <tr className="bg-white border-b">
                                <td>{data._id}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>
                                    <img className="w-20 h-20 rounded-full mr-auto ml-auto mb-2"
                                         src={data.avatar}
                                         alt="profile"
                                    />
                                </td>
                                <td onClick={e => handleEditUser(e, data)} className="inline-block mr-4 px-4 p-1 rounded bg-blue-600 text-md mt-6 text-indigo-50">
                                    <FaEdit className="inline" />
                                    Edit
                                </td>
                                <td onClick={e => handleDeleteUser(e, data)} className="inline-block mr-4 px-4 p-1 rounded bg-red-600 text-md mt-6 text-indigo-50">
                                    <FaTrash className="inline" />
                                    Delete
                                </td>
                            </tr>
                            </tbody>
                        )
                    })}
                </table>
                <div className="w-full xl:bottom-28 bottom-20 absolute">
                    <button onClick={handleCreateUser} className="bg-blue-800 text-white rounded-md text-lg px-6 p-2">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
