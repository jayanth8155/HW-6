const express = require('express')
const router = express.Router()
const Team = require('../models/teamModel')
const mongoose = require('mongoose')

// GET entire team document
router.get('/', async (req, res) => {
  try {
    const team = await Team.findOne()
    res.status(200).json(team)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ADD new horse
router.post('/horses', async (req, res) => {
  try {
    const updatedTeam = await Team.findOneAndUpdate(
      {},
      { $push: { horses: req.body } },
      { new: true }
    )
    res.status(200).json(updatedTeam)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// UPDATE specific horse
router.patch('/horses/:horseId', async (req, res) => {
  const { horseId } = req.params
  try {
    const updatedTeam = await Team.findOneAndUpdate(
      { 'horses.horse_id': Number(horseId) },
      { $set: { 'horses.$': req.body } },
      { new: true }
    )
    res.status(200).json(updatedTeam)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE specific horse
router.delete('/horses/:horseId', async (req, res) => {
  const { horseId } = req.params
  try {
    const updatedTeam = await Team.findOneAndUpdate(
      {},
      { $pull: { horses: { horse_id: Number(horseId) } } },
      { new: true }
    )
    res.status(200).json(updatedTeam)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router