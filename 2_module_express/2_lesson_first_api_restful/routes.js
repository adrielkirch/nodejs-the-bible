'use strict';

const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes'); 

// In memory database to demonstrate how it would be in a real database
let items = [];

/**
 * Retrieve an item by _id.
 * @route GET /items/{id}
 * @param {number} id.path.required - The ID of the item.
 * @returns {Object} The item object.
 * @throws {Error} Internal server error.
 */
router.get('/:id', async (req, res) => {
    try {
        // Logic to retrieve item by _id
        const itemId = req.params.id;
        const item = items.find(item => item.id === parseInt(itemId));
        if (!item) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `Item with ID ${itemId} not found` });
        }
        res.json(item);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

/**
 * Retrieve all items.
 * @route GET /items
 * @returns {Array} An array of items.
 * @throws {Error} Internal server error.
 */
router.get('/', async (req, res) => {
    try {
        res.json(items);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

/**
 * Add a new item.
 * @route POST /items
 * @param {Object} item.body.required - The item object to add.
 * @returns {Object} The added item.
 * @throws {Error} Bad request if the item is invalid.
 */
router.post('/', async (req, res) => {
    try {
        const newItem = req.body;
        if (!newItem.hasOwnProperty('id')) {
            throw new Error("Invalid item format. 'id' property is required.");
        }

        const existingItem = items.find(item => item.id === newItem.id);
        if (existingItem) {
            throw new Error(`Item with ID ${newItem.id} already exists.`);
        }
        items.push(newItem);
        res.status(StatusCodes.CREATED).json(newItem);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
});

/**
 * Update an existing item.
 * @route PUT /items/{id}
 * @param {number} id.path.required - The ID of the item to update.
 * @param {Object} item.body.required - The updated item object.
 * @returns {Object} The updated item.
 * @throws {Error} Bad request if the item is invalid.
 */
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedItem = req.body;
        if (!updatedItem.hasOwnProperty('id')) {
            throw new Error("Invalid item format. 'id' property is required.");
        }

        const existingItem = items.find(item => item.id === updatedItem.id);
        if (!existingItem) {
            throw new Error(`Item with ID ${updatedItem.id} not already exists.`);
        }
        items[id] = updatedItem;
        res.json(updatedItem);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
});

/**
 * Delete an item by _id.
 * @route DELETE /items/{id}
 * @param {number} id.path.required - The ID of the item to delete.
 * @returns {void}
 * @throws {Error} Bad request if deletion fails.
 */
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        items.splice(id, 1);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
});

module.exports = router;
