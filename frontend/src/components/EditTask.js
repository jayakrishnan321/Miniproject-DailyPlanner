import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './EditTask.css';

function EditTask() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
  });

  // Fetch task by ID on page load
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/id/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching task");
      }
    };

    fetchTask();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Submit updated task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
      alert("Task updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input className="title"
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea className="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input className="date"
          type="date"
          name="date"
          value={task.date} // Ensure proper date input format
          onChange={handleChange}
          required
        />
        <button className="updatebutton" type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;
