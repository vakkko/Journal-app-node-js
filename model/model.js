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
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
