import React from 'react';
import axios from 'axios';

function EditUser( { editUser, removeModal, setUsers, users } : any) {

    interface editerUserData{
        first_name: string,
        last_name: string,
        email: string,
        avatar: string,
    }

    const [editedUser, setEdited] = React.useState<editerUserData>({
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
        axios.put<editerUserData>(`http://localhost:3002/api/users/${editUser._id}`,
            {
                email: editedUser.email,
                first_name: editedUser.first_name,
                last_name: editedUser.last_name,
                avatar: editedUser.avatar,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json',
                },
            },
        ).then(response => users.map((user: any, index: any) => {
            if (user._id === editUser._id) {
                setUsers(users.filter((user : any) => user._id !== editUser._id).concat({...user,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    avatar: response.data.avatar,
                    email: response.data.email}));
            }
        }))
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