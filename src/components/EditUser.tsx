import React from 'react';
import { editerUserData } from '../interfaces/Users';

function EditUser( { socket, editUser, removeModal, setUsers, users } : any) {

    const [editedUser, setEdited] = React.useState<editerUserData>({
        _id: editUser._id,
        email: editUser.email,
        first_name: editUser.first_name,
        last_name: editUser.last_name,
        avatar: editUser.avatar,
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setEdited({...editedUser, [e.target.name] : e.target.value})
    }

    const handlePUT = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('update/user', editedUser);
    }

    return(
        <div className="w-full absolute flex items-center justify-center top-30">
            <div className="w-2/4 grid grid-cols-2 bg-white shadow-[5px_5px_40px_5px_rgba(0,0,0,0.56)] rounded-md pt-4">
                <div className="w-full flex justify-center items-center">
                    <img className="w-2/3 h-2/3 rounded-full" src={editUser.avatar} alt="profile" />
                </div>
                <form onSubmit={handlePUT} className="w-full flex flex-col justify-center items-center">
                    <input
                        className="w-4/5 border rounded-md mt-6 p-2"
                        name="first_name"
                        value={editedUser.first_name}
                        onChange={handleChange}
                        placeholder="First_name"
                    />
                    <input
                        className="w-4/5 border rounded-md p-2 mt-4"
                        name="last_name"
                        value={editedUser.last_name}
                        onChange={handleChange}
                        placeholder="Last_name"
                    />
                    <input
                        className="w-4/5 border rounded-md p-2 mt-4"
                        name="email"
                        type="email"
                        value={editedUser.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        className="w-4/5 border rounded-md p-2 mt-4"
                        name="avatar"
                        value={editedUser.avatar}
                        onChange={handleChange}
                        placeholder="Avatar"
                    />
                    <div className="w-4/5 pb-8 mt-6 grid grid-cols-2 space-x-2">
                        <button className="w-full bg-blue-800 text-white rounded-md text-lg p-1" type="submit">
                            Save
                        </button>
                        <button onClick={removeModal} className="w-full bg-red-800 text-white rounded-md text-lg p-1">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;
