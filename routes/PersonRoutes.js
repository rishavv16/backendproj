const express = require('express');
const router = express.Router();
const Person=  require('../models/person')


// POST route for Person
router.post('/', async (req, res) => {
    try {
      const { name, age, work, mobile, email, address, salary,password,username } = req.body;

      if (!name || !work || !mobile || !email || !address || !salary || !password || !username) {
        return res.status(400).json({ error: "All required fields must be provided" });
      }

      const newPerson = new Person({ name, age, work, mobile, email, address, salary, password, username});

      const response = await newPerson.save();
      console.log("Data saved successfully");
      res.status(200).json(response);
    } catch (err) {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Internal server error" });
    }
});

// GET route for Person
router.get('/', async (req, res) => {
    try { 
        const data = await Person.find();
        console.log('Data has been fetched successfully');
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route for specific workType (chef or manager)
router.get('/:workType', async (req, res) => { // Fixed the route
   try {
    const workType = req.params.workType;
    if (workType === 'chef' || workType === 'manager') {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid work type defined' }); // Handle invalid workType
    }
   } catch (err) {
    console.log('Error:', err)  ;
    res.status(500).json({ error: 'Internal server error' });
   }
});

module.exports = router;
