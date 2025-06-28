import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddTasks.css'

function AddTasks() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/tasks", task);
            alert("Task added successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Error adding task");
        }
    };

    return (
        <div>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="title"
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input className="description"
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input className="date"
                        type="date"
                        name="date"
                        value={task.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="submitbutton" type="submit">Save Task</button>
            </form>
        </div>
    )
}

export default AddTasks
