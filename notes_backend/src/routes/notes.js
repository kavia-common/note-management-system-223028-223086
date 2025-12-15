const express = require('express');
const controller = require('../controllers/notes');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: List all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: A list of notes
 */
router.get('/', controller.listNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note by id
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The requested note
 *       404:
 *         description: Note not found
 */
router.get('/:id', controller.getNote);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: Note created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       200:
 *         description: Note updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Note not found
 */
router.put('/:id', controller.updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Note deleted
 *       404:
 *         description: Note not found
 */
router.delete('/:id', controller.deleteNote);

module.exports = router;
