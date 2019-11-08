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

/**
 * @swagger
 *
 * /to-do-items:
 *   delete:
 *     description: Delete one to do item
 *     tags:
 *        - to-do-items
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *     responses:
 *       200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.delete('/:id', getToDoItem, async (req, res) => {
  try {
    await res.toDoItem.remove()
    res.json({ message: 'Deleted this to do item' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

async function getToDoItem(req, res, next) {
  try {
    toDoItem = await ToDoItem.findById(req.params.id)
    if (toDoItem == null) {
      return res.status(404).json({ message: 'Cant find to do item'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.toDoItem = toDoItem
  next()
}

module.exports = router
