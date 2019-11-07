const express = require('express')
const router = express.Router()

/**
 * @swagger
 *
 * /to-do-items:
 *   get:
 *     description: Get the to do items
 *     tags:
 *       - to-do-items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Hello World
 */
// Get all to do items
router.get('/', (req, res) => {
    res.send("Hello World!")
})

// Create one to do item
router.post('/', (req, res) => {
})

// Update one to do item
router.patch('/:id', (req, res) => {
})

// Delete one to do item
router.delete('/:id', (req, res) => {
})

module.exports = router