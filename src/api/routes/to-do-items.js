const express = require('express')
const router = express.Router()
const ToDoItem = require('../models/to-do-item')

/**
 * @swagger
 *
 * definitions:
 *   NewToDoItem:
 *     type: object
 *     required:
 *       - label
 *     properties:
 *       label:
 *         type: string
 *   ToDoItem:
 *     allOf:
 *       - $ref: '#/definitions/NewToDoItem'
 *       - required:
 *         - id
 *         - isDone
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 *         isDone:
 *           type: boolean
 */

/**
 * @swagger
 *
 * /to-do-items:
 *   get:
 *     description: Get all to do items
 *     tags:
 *       - to-do-items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: to do items
 *         schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/ToDoItem'
 */
router.get('/', async (req, res) => {
  try {
    const toDoItems = await ToDoItem.find()
    res.json(toDoItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 *
 * /to-do-items:
 *   post:
 *     description: Create one to do item
 *     tags:
 *       - to-do-items
 *     requestBody:
 *        description: ToDoItem object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/NewToDoItem'
 *     responses:
 *       201:
 *         description: to do item
 *         schema:
 *           $ref: '#/definitions/ToDoItem'
 */
router.post('/', async (req, res) => {
  const toDoItem = new ToDoItem({
    label: req.body.label
  })

  try {
    const newToDoItem = await toDoItem.save()
    res.status(201).json(newToDoItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one to do item
router.patch('/:id', (req, res) => {
})

// Delete one to do item
router.delete('/:id', (req, res) => {
})

module.exports = router
