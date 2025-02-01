const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jockeySchema = new Schema({
  jockey_id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  experience_years: { type: Number, required: true }
})

const horseSchema = new Schema({
  horse_id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  wins: { type: Number, required: true },
  races: { type: Number, required: true },
  jockey: jockeySchema
})

const teamSchema = new Schema({
  team_name: { type: String, required: true },
  location: { type: String, required: true },
  established_year: { type: Number, required: true },
  horses: [horseSchema]
})

module.exports = mongoose.model('Team', teamSchema, 'horseteamA')