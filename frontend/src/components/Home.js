import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Home.css'
import axios from 'axios';

function Home() {

  const navigate = useNavigate()
  const [searchDate, setSearchDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const completedtasks = tasks.filter((task) => task.completed)
  const uncompletedtasks = tasks.filter((task) => !task.completed)

  const handlecomplete = async (id) => {
    console.log(id)
    const state = await axios.get(`http://localhost:5000/api/tasks/complete/${id}`)
    console.log(state.data.completed)
    let value = state.data.completed
    // Toggle the value
    let updatedValue;
    if (value) {
      updatedValue = false;
    } else {
      updatedValue = true;
    }
    // Send updated value
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      completed: updatedValue
    });
    handleSearch()
  }

  const handlebutton = () => {
    navigate("/AddTasks")
  }

  const handleSearch = async () => {
    if (!searchDate) return alert("Select a date!");
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${searchDate}`);
      setTasks(res.data);

      console.log(res.data)
    } catch (err) {
      console.error(err);
      alert("Error fetching tasks");
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = String(date.getFullYear()).slice(-2); // last 2 digits
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id)); // remove from UI
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  return (
    <div>
      <h1 className='title'>Daily Planner</h1>
      <h5>search date here</h5>
      <input className="search"
        type="date"
        name="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        required
      />
      <button onClick={handleSearch} className='searchbutton'>search</button>
      <h3>completed tasks</h3>
      {completedtasks.length === 0 ? (
        <p>No completed  tasks found for this date.</p>
      ) : (<h3>completed Tasks:</h3>,
        completedtasks.map((task) => (
          <div className='box' key={task._id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <small>{formatDate(task.date)}</small>
            <button className='completebutton' onClick={() => handlecomplete(task._id)} >{task.completed ? "completed" : "complete"}</button>
            <button onClick={() => handleDelete(task._id)} className='deletebutton'>Delete</button>
            <button onClick={() => navigate(`/edit/${task._id}`)} className='editbutton'>Edit</button>
          </div>
        ))
      )}

      <h3>uncompletedtasks</h3>
      {uncompletedtasks.length === 0 ? (
        <p>No uncompleted tasks found for this date.</p>
      ) : (
        uncompletedtasks.map((task) => (
          <div className='box' key={task._id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <small>{formatDate(task.date)}</small>
            <button className='completebutton' onClick={() => handlecomplete(task._id)} >{task.completed ? "completed" : "complete"}</button>
            <button onClick={() => handleDelete(task._id)} className='deletebutton'>Delete</button>
            <button onClick={() => navigate(`/edit/${task._id}`)} className='editbutton'>Edit</button>
          </div>
        ))
      )
      }
      <div className="button-align">
        <button onClick={handlebutton} className='button'>Add Tasks</button>
      </div>
    </div>
  )
}

export default Home
