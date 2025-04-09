import { useState } from "react";
import { PenIcon, PlusIcon } from "lucide-react";
import { useGetTasksQuery } from "../features/api/taskApi"
import TaskModal from "../components/TaskModal";

const Dashboard = () => {
    const { data: tasks, isLoading } = useGetTasksQuery();
    const [selectedTask, setSelectedTask] = useState(null);

    const stats = [
        { title: "Total Tasks", value: tasks?.length, color: "bg-blue-100" },
        { title: "Completed Tasks", value: tasks?.filter(t => t.completed).length, color: "bg-green-100" },
        { title: "Pending Tasks", value: tasks?.filter(t => !t.completed).length, color: "bg-yellow-100" }
    ]

    isLoading && <div className="flex justify-center items-center h-screen"><p className="text-lg">Loading...</p></div>

    return (
        <div className="container mx-auto p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-lg ${stat.color} flex items-center justify-between`}>
                        <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-md">
                {/* List Header */}
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Your Tasks</h2>
                    <button
                        onClick={() => setSelectedTask({})}
                        className="bg-blue-500 text-white flex px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                        <PlusIcon className="w-6 h-6 mr-2" /> New Task
                    </button>
                </div>

                {/* Task Items */}
                <div className="divide-y">
                    {tasks?.map(task => (
                        <div
                            key={task._id}
                            className="p-4 hover:bg-gray-50 flex items-center justify-between">
                            {/* Task */}
                            <div>
                                <h3 className="font-medium">{task.title}</h3>
                                <p className="text-gray-600 text-sm">{task.description}</p>
                            </div>

                            {/* Task Actions */}
                            <div className="flex items-center space-x-4">
                                <span className={`px-2 py-1 text-sm rounded-lg ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {task.completed ? 'Completed' : 'Pending'}
                                </span>
                                <button
                                    onClick={() => setSelectedTask(task)}
                                    className="text-gray-500 hover:text-blue-600 cursor-pointer"
                                >
                                    <PenIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Task Modal */}
            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </div>
    )
}

export default Dashboard