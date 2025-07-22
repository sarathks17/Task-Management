const express = require('express');

const Task = require('../schema/taskSchema.js')


// API TO ADD TASK

const addTask = async (req,res) => {
    try {
        const {title,description,satus,due_date} = req.body
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// API TO SHOW TASK
 
const showTask = async (req,res)=> {
    try {
        const task = await Task.find({})
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// API TO UPDATE TASK

const updateTask = async (req,res) => {
    try {
        const {id} = req.params
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// API TO DELETE TASK

const deleteTask = async (req,res) => {
    try {
        const {id} = req.params
        const deletedTask = await Task.findByIdAndDelete(id)
        res.status(200).json(deletedTask)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    addTask,
    showTask,
    updateTask,
    deleteTask
}