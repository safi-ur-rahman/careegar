const mongoose = require('mongoose')
const { Schema } = mongoose

const experienceSchema = new Schema({
    years: {
      type: Number,
      required: true
    },
    skill: {
      type: String,
      required: true
    }
  });

const workshopSchema = new Schema({
    mechanic_id: {
        type: String,
        required: true
    },
    schedule: [
        {
          day: String,
          startTime: String,
          endTime: String
        }
    ],
    experiences: [experienceSchema],
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    description: {
        type: String,
    },
})

const WorkshopModel = mongoose.model('Workshop', workshopSchema);

module.exports = WorkshopModel;