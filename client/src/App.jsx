import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [popup, setpopup] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null); // Track if updating

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form for add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTaskId) {
        // UPDATE
        const response = await axios.put(
          `http://localhost:3001/api/task/${editTaskId}`,
          formData
        );
        console.log("Updated task:", response.data);
        alert("Task updated successfully");
      } else {
        // CREATE
        const response = await axios.post(
          "http://localhost:3001/api/task",
          formData
        );
        console.log("Created task:", response.data);
        alert("Task created successfully");
      }

      setFormData({ title: "", description: "", due_date: "", status: "" });
      setpopup(false);
      setEditTaskId(null);
      getAllTask(); // Refresh

    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Fetch all tasks
  const getAllTask = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/task");
      setTasks(response.data);
    } catch (error) {
      console.log("Error while fetching tasks", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/task/${id}`);
      alert("Task Deleted Successfully");
      getAllTask(); // Refresh
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div className="container">
      {/* Popup Form */}
      {popup && (
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
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  required
                />
                <select
                  value={formData.status}
                  name="status"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="in-Progress">in-Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <div className="popup-btn">
                  <button
                    type="button"
                    onClick={() => {
                      setpopup(false);
                      setFormData({ title: "", description: "", due_date: "", status: "" });
                      setEditTaskId(null);
                    }}
                  >
                    Back
                  </button>
                  <button type="submit">{editTaskId ? "Update Task" : "Add Task"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Form */}
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
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
            />
            <select
              value={formData.status}
              name="status"
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>

      {/* Tasks Display */}
      <div className="card-section">
        {tasks.map((task, id) => (
          <div key={id} className="card-container">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <h5>{task.due_date?.split("T")[0]}</h5>
            <h4>Status: {task.status}</h4>
            <div className="card-btn">
              <button
                onClick={() => {
                  setFormData({
                    title: task.title,
                    description: task.description,
                    due_date: task.due_date?.split("T")[0] || "",
                    status: task.status,
                  });
                  setEditTaskId(task._id);
                  setpopup(true);
                }}
              >
                Update
              </button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
