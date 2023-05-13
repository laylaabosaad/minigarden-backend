import mongoose from "mongoose";
const Schema= mongoose.Schema

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  
}, {
  timestamps:true

});

const Category = mongoose.model("category", CategorySchema);
export default Category;
