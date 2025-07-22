const express = require('express')
const {addTask,showTask,updateTask,deleteTask} = require('../controller/taskController.js')
const router =  express.Router();


router.post('/',addTask)
router.get('/',showTask)
router.put('/:id',updateTask)
router.delete('/:id',deleteTask)


module.exports = router;