import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
     
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const subCategory = mongoose.model("subcategory", subCategorySchema);
export default subCategory