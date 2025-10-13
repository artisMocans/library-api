const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {name, author, year, available} = req.body;
        const book = await Book.create({name, author, year, available});
        res.status(201).json(book);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/', async (_req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.json(books);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({error: 'Book not found'});
        res.json(book);
    } catch (error) {
        res.status(400).json({error: 'Invalid book ID'});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {name, author, year, available} = req.body;
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            {name, author, year, available},
            {new: true, runValidators: true}
        );
        if (!book) return res.status(404).json({error: 'NotFound'});
        res.json(book);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({error: 'ValidationError', details: err.errors});
        }
        res.status(400).json({error: 'Invalid book ID or request body'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({error: 'NotFound'});
        res.status(204).send();
    } catch {
        res.status(400).json({error: 'Invalid book ID'});
    }
});

module.exports = router;