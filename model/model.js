import mongoose from "mongoose";

const Schema = mongoose.Schema;

const journalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
