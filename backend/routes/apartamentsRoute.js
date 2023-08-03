const express = require('express');
const router = express.Router();
const connectDB = require('../db');
const { ObjectId } = require('mongodb');
const getCurrentDate = require('../functions/getCurrentDate');

router.get('/apartaments', async (req, res) => {
  try {
    const db = await connectDB();
    const apartmentsCollection = db.collection("apartaments");
    const apartments = await apartmentsCollection.find({}).toArray();
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/apartaments', async (req, res) => {
  const newApartament = {
    apartament: Number(req.body.apartament),
    object: req.body.object,
    floor: Number(req.body.floor),
    kv: Number(req.body.kv),
    date: getCurrentDate(),
    status: req.body.status,
    price: Number(req.body.price),
  }
  if (req.body.status === 'Бронь' || req.body.status === 'Куплено') {
    newApartament.client = req.body.client;
    newApartament.busyUntil = req.body.busyUntil;
  }

  try {
    const db = await connectDB();
    const apartmentsCollection = db.collection("apartaments");
    await apartmentsCollection.insertOne(newApartament);

    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
});

router.put('/apartaments', async (req, res) => {
  const updateApartament = {
    _id: new ObjectId(req.body._id),
    apartament: req.body.apartament,
    object: req.body.object,
    floor: req.body.floor,
    kv: req.body.kv,
    date: req.body.date,
    status: req.body.status,
    price: req.body.price,
  }

  if (req.body.status === 'Бронь' || req.body.status === 'Рассрочка') {
    updateApartament.busyUntil = req.body.busyUntil;
    updateApartament.client = req.body.client;
  }

  try {
    const db = await connectDB();
    const apartmentsCollection = db.collection("apartaments");

    const existingDoc = await apartmentsCollection.findOne(new ObjectId(req.body._id));

    const updateQuery = {
      $set: updateApartament,
      $unset: {},
    };

    for (const key in existingDoc) {
      if (key !== '_id' && !(key in updateApartament)) {
        updateQuery.$unset[key] = '';
      }
    }

    await apartmentsCollection.updateOne({ _id: new ObjectId(req.body._id) }, updateQuery)
    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
})

router.delete('/apartaments/:id', async (req, res) => {
  try {
    const id = req.params.id
    const db = await connectDB();
    const apartmentsCollection = db.collection("apartaments");
    await apartmentsCollection.deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;