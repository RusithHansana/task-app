import { useState } from "react"
import { useCreateTaskMutation, useUpdateTaskMutation } from "../features/api/taskApi"
import { useSelector } from "react-redux"

const TaskModal = ({ task, onClose }) => {
    const { user } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        title: task?.title || "",
        description: task?.description || "",
        completed: task?.completed || false,
    })

    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (task._id) {
            try {
                await updateTask({ id: task._id, ...formData }).unwrap()
                alert("Task updated successfully");
            } catch (error) {
                alert("Failed to update task: ", error.message)
            }
        } else {
            try {
                await createTask({ user: user._id, ...formData }).unwrap()
                alert("Task created successfully");
            } catch (error) {
                alert("Failed to create task: ", error.message)
            }
        }

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">{task._id ? "Edit Task" : "New Task"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Task Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Task Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <label className="block text-sm font-medium text-gray-700">Completed</label>
                            <input
                                type="checkbox"
                                checked={formData.completed}
                                onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                                className="rounded-lg w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal