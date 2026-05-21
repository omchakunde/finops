import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  courseName: String,
  coursePrice: String,

  // ✅ ADD THESE
  name: String,
  email: String,

  status: String,
  batchName: {
    type: String,
    default: ""
  },
  batchAssignedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Enrollment ||
  mongoose.model("Enrollment", EnrollmentSchema);
