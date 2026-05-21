import mongoose from "mongoose";

const WebinarSchema = new mongoose.Schema({
  name: String,
  email: String,
  webinarTitle: String,
  date: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Webinar || mongoose.model("Webinar", WebinarSchema);