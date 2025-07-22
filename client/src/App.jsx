import React from 'react'
import './App.css'
const App = () => {
  return (
    <div className='container'>
    <div className='form-container'>
      <form>
        <div className='input-container'>
          <input type="text" placeholder='Add New Task'/>
          <button>Add Task</button>
        </div>
      </form>
    </div>
    <div className='card-container'>
            <h4>Card Title</h4>
            <p>sample description about the card</p>
            <h5>Due Date: 22-10-2000</h5>
            <h4>Status: Pending</h4>
           <div className='card-btn'>
            <button>Update</button>
            <button>Delete</button> 
           </div>
    </div>
    </div>
  )
}

export default App
