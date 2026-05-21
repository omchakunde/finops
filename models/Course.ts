import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    duration: String,
    provider: String,
    tag: String,
    enrolled: String,
    level: String,
    badge: String,
    color: String,
    image: String,
    videoUrl: String,
    pdfUrl: String,
    materialUrl: String,
    materialTitle: String,
    description: String,
    sessions: String,
    professionals: String,
    exam: String,
    rating: String,
    learn: [String],
    prerequisites: [String],
    career: String,
    price: String,
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);
