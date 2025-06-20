import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NeJzjp_HcH3aOXrQw3efqRRGaicM9kZPqasyjbJfJ7lnOZlU8uYz1wY0PG2JLgwuT28&usqp=CAU",
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "This user has not set a bio yet.",
  },
  socialLinks: {
    type: Object,
    default: {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  },
  experience: {
    type: Number,
    default: 0,
  },
  skills: {
    type: [String],
    default: [],
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
