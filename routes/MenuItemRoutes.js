const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu'); // Correct model import

// POST route for Menu
router.post('/', async (req, res) => {
    try {
        const { dishname, NumberOfOrder, taste, rating, is_drink, price } = req.body;

        // Check if required fields are missing
        if (!dishname || !NumberOfOrder || !taste || !rating || !price || is_drink === undefined) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        // Create a new menu item
        const NewItem = new MenuItem({ dishname, NumberOfOrder, taste, rating, is_drink, price });

        // Save to database
        const response = await NewItem.save();
        console.log("Menu item saved successfully");
        res.status(201).json(response);
    } catch (err) {
        console.error("Error saving menu item:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route for Menu
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find(); // Use MenuItem model
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route for Menu based on taste
router.get('/:tasteType', async (req, res) => { // Remove incorrect dot (.)
    try {
        const tasteType = req.params.tasteType;
        if (['sour', 'spicy', 'normal'].includes(tasteType)) {
            const response = await MenuItem.find({ taste: tasteType });
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste type defined' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT route to update a menu item by ID
router.put('/:id', async (req, res) => { // Fix async function and route
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // Return updated document
            runValidators: true // Ensure validation rules apply
        });

        if (!response) {
            return res.status(404).json({ error: "Menu item not found" });
        }
         
        res.status(200).json(response);
    } catch (err) {
        console.error("Error updating menu item:", err);
        res.status(500).json({ error: "Internal server error" });
    } 
});

module.exports = router;
