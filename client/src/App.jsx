import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [popup, setpopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/task",
        formData
      );
      alert("Data send Successfully");
    } catch (error) {
      console.log("Error sending data", error);
    }
  };

  const getAllTask = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/task");
      console.log("response", response.data);
      setTasks(response.data);
      console.log("Successfully fetched");
    } catch (error) {
      console.log("Error occure while fetching data", error);
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/task/${id}`,
        updatedData
      );
      console.log("Task updated", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating task",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleUpdate = async (taskId) => {
    const updatedData = {
      title: "Updated Title",
      description: "Updated description",
      due_date: "2025-07-31",
      status: "in-progress",
    };

    try {
      const updatedTask = await updateTask(taskId, updatedData);
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);
  return (
    <div className="container">
      {popup ? (
        <div className="blur-overlay">
          <div className="popus">
            <form onSubmit={handleSubmit}>
              <div className="popup-container">
                <input
                  type="text"
                  placeholder="Task"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  placeholder="Due_Date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  required
                />
                <select
                  value={formData.status}
                  name="status"
                  onChange={handleChange}
                >
                  <option value="">Pending</option>
                  <option value="">In-Progress</option>
                  <option value="">Completed</option>
                </select>
                <div className="popup-btn">
                  <button onClick={() => setpopup((prev) => !prev)}>Back</button>
                  <button type="submit">update Task</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Task"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              placeholder="Due_Date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
            />
            <select
              value={formData.status}
              name="status"
              onChange={handleChange}
            >
              <option value="">Pending</option>
              <option value="">In-Progress</option>
              <option value="">Completed</option>
            </select>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>
      <div className="card-section">
        {tasks.map((task, id) => (
          <div key={id} className="card-container">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <h5>{task.due_date}</h5>
            <h4>Status: {task.status}</h4>
            <div className="card-btn">
              <button onClick={() => setpopup((prev) => !prev)}>Update</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
