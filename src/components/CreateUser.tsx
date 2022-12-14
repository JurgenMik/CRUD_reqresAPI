import React from 'react';
import { newUserData } from '../interfaces/Users';

function CreateUser( { socket, removeModal, setUsers, users } : any) {

    const [newUser, setNewUser] = React.useState<newUserData>({
        email: '',
        first_name: '',
        last_name: '',
        avatar: '',
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [e.target.name] : e.target.value})
    }

    const handlePOST = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('create/user', newUser);
    }

    return(
        <div className="w-full absolute flex items-center justify-center top-30">
            <div className="w-1/2 bg-white shadow-[5px_5px_40px_5px_rgba(0,0,0,0.56)] rounded-md pt-4">
                <span onClick={removeModal} className="float-right mr-10 font-semibold text-red-800">
                    X
                </span>
                <form onSubmit={handlePOST} className="w-full flex flex-col justify-center items-center">
                    <input
                        className="w-1/2 border rounded-md mt-6 p-2"
                        name="first_name"
                        value={newUser.first_name}
                        onChange={handleChange}
                        placeholder="First_name"
                    />
                    <input
                        className="w-1/2 border rounded-md p-2 mt-4"
                        name="last_name"
                        value={newUser.last_name}
                        onChange={handleChange}
                        placeholder="Last_name"
                    />
                    <input
                        className="w-1/2 border rounded-md p-2 mt-4"
                        name="email"
                        type="email"
                        value={newUser.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        className="w-1/2 border rounded-md p-2 mt-4"
                        name="avatar"
                        value={newUser.avatar}
                        onChange={handleChange}
                        placeholder="Avatar"
                    />
                    <div className="w-full pb-8 mt-6">
                        <button className="w-1/2 bg-blue-800 text-white rounded-md text-lg px-4 p-1" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
