import { useState } from "react"
import { useSelector } from "react-redux"
import { useUpdateUserMutation } from "../features/api/userApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || ""
    })
    const dispatch = useDispatch();
    const [updateUser, { isLoading }] = useUpdateUserMutation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser({ id: user._id, ...formData }).unwrap();
            if (updatedUser._id) dispatch(setCredentials({ user: updatedUser }));

        } catch (error) {
            console.error("Failed to update user: ", error);
        }
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">User Information</h2>
                <form className="space-y-4 mt-4 w-full max-w-md" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            email="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                            {isLoading ? "Updating ..." : "Update Profile"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Profile