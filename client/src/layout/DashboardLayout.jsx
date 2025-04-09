import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { AlignJustify, X } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/api/authApi';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
            navigate('/login')
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-blue-200 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
             transition-transform duration-300 ease-in-out`}
            >
                <div className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className="text-xl font-bold text-gray-800">Task Manager</h2>
                        <button
                            onClick={() => setIsSidebarOpen(prevState => !prevState)}
                            className="text-gray-600 hover:bg-gray-100 rounded-lg p-2"
                        ><X className='w-6 h-6' /></button>
                    </div>
                    <nav className='mt-8'>
                        <Link to="/dashboard" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">Dashboard</Link>
                        <Link to="/profile" className="block p-2 text-gray-700 hover:bg-gray-100 rounded-lg">Profile</Link>
                    </nav>
                    <button
                        onClick={() => handleLogout()}
                        className="w-full text-left p-2 text-red-600 hover:bg-red-300 rounded-lg mt-4 cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={isSidebarOpen ? "lg:pl-64" : "transform lg:pl-0 transition-transform duration-300 ease-in-out"}>
                {/* Header */}
                <header className='bg-white shadow-sm'>
                    <div className='flex items-center justify-between p-4'>
                        <button
                            onClick={() => setIsSidebarOpen(prevState => !prevState)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <AlignJustify className="w-6 h-6" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <p className="text-gray-700">Welcome, <span className="font-semibold">{user?.name}</span></p>
                        </div>
                    </div>
                </header>

                {/* Main Area */}
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout