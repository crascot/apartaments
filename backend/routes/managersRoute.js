const express = require('express');
const router = express.Router();
const connectDB = require('../db');
const { ObjectId } = require('mongodb');
const getCurrentDate = require('../functions/getCurrentDate');

router.get('/managers', async (req, res) => {
  try {
    const db = await connectDB();
    const apartmentsCollection = db.collection("managers");
    const apartments = await apartmentsCollection.find({}).toArray();
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/managers', async (req, res) => {
  const newApartament = {
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    dateCreated: getCurrentDate(),
    password: req.body.password,
    countDeal: 0
  }

  try {
    const db = await connectDB();
    const apartmentsCollection = db.collection("managers");
    await apartmentsCollection.insertOne(newApartament);

    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
});

router.put('/managers', async (req, res) => {
  const updateApartament = {
    _id: new ObjectId(req.body._id),
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  }

  try {
    const db = await connectDB();
    const apartmentsCollection = db.collection("managers");

    await apartmentsCollection.updateOne({ _id: new ObjectId(req.body._id) }, {$set: updateApartament})
    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
})

router.delete('/managers/:id', async (req, res) => {
  try {
    const id = req.params.id
    const db = await connectDB();
    const apartmentsCollection = db.collection("managers");
    await apartmentsCollection.deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;