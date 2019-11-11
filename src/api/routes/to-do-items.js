const express = require('express')
const router = express.Router()
const ToDoItem = require('../models/to-do-item')

/**
 * @swagger
 *
 * components:
 *  schemas:
 *   NewToDoItem:
 *     type: object
 *     required:
 *       - label
 *     properties:
 *       label:
 *         type: string
 *   ToDoItem:
 *      allOf:
 *        - $ref: '#/components/schemas/NewToDoItem'
 *        - type: object
 *          properties:
 *            _id:
 *              type: string
 *            isDone:
 *              type: boolean
 *            createdDate:
 *              type: string
 *              format: date-time
 *            __v:
 *              type: integer
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
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ToDoItem'
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
 *              $ref: '#/components/schemas/NewToDoItem'
 *     responses:
 *       201:
 *         description: to do item
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ToDoItem'
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

/**
 * @swagger
 *
 * /to-do-items:
 *   patch:
 *     description: Update one to do item
 *     tags:
 *       - to-do-items
 *     requestBody:
 *        description: ToDoItem object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ToDoItem'
 *     responses:
 *       200:
 *         description: to do item
 *         schema:
 *           $ref: '#/components/schemas/ToDoItem'
 */
router.patch('/:id', getToDoItem, async (req, res) => {
  if (req.body.label != null) {
    res.toDoItem.label = req.body.label
  }
  if (req.body.isDone != null) {
    res.toDoItem.isDone = req.body.isDone
  }
  try {
    const updatedToDoItem = await res.toDoItem.save()
    res.json(updatedToDoItem)
  } catch {
    res.status(400).json({ message: err.message })
  }
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
