import React, { useEffect } from 'react';
import CreateUser from "./components/CreateUser";
import { FaEdit } from "react-icons/fa";
import EditUser from "./components/EditUser";
import axios from "axios";

function App() {

   interface userData {
        id: number,
        first_name: string,
        last_name: string,
        avatar: string,
  }

      const [users, setUsers] = React.useState<userData[]>([]);
      const [create, setCreate] = React.useState<string>('');
      const [edit , setEdit] = React.useState<string>('');
      const [editUser, setEditUser] = React.useState<userData>()

      useEffect(() => {
        handleGET();
      }, []);

      const handleGET = () => {
        axios.get("https://reqres.in/api/users")
            .then(response => {
              setUsers(users.concat(response.data.data));
            })
      }

      const handleCreateUser = () => {
          setCreate('create');
      }

      const handleEditUser = (e : React.MouseEvent<HTMLButtonElement>, data : userData) => {
          setEditUser(data);
          setEdit('edit');
      }

      const removeModal = () => {
          setCreate('');
      }

      const removeEditModal = () => {
          setEdit('');
      }

  return (
      <div className="h-screen w-full">
        <div className="w-2/3 h-full flex items-center justify-center m-auto overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg">
          <table className="w-full align-center text-center text-lg text-left text-gray-500 justify-center mb-20">
              {create === 'create' ? <CreateUser removeModal={removeModal}/> : null}
              {edit === 'edit' ? <EditUser removeModal={removeEditModal} editUser={editUser}/> : null}
            <thead className="text-xs text-gray-800 uppercase bg-gray-50">
                <tr>
                    <th className="py-10 px-6 text-xl">Id</th>
                    <th className="py-10 px-6 text-xl">First_name</th>
                    <th className="py-10 px-6 text-xl">Last_name</th>
                    <th className="py-10 px-6 text-xl">Avatar</th>
                    <th className="py-10 px-6 text-xl">Action</th>
                </tr>
            </thead>
            {users.map((data : any, index : number) => {
              return (
                <tbody key={index}>
                    <tr className="bg-white border-b">
                        <td>{data.id}</td>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>
                            <img className="w-20 h-20 rounded-full mr-auto ml-auto mb-2"
                               src={data.avatar}
                               alt="profile"
                            />
                        </td>
                        <button onClick={e => handleEditUser(e, data)} className="inline-block mr-4 px-4 p-1 rounded bg-blue-600 text-md mt-6 text-indigo-50">
                            <FaEdit className="inline"/>
                            Edit
                        </button>
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
