import Category from "../models/CategoryModel.js";

const addCategory = async (req, res) => {
    const title = req.body.title;
  try {
  
    const add = new Category({
      title: title,
    });
    const savedcategory = await add.save();

    res.send({
      message: "category added successfully",
      data: savedcategory,
    });
  } catch {
    res.send({
      message: "addition failed",
    });
  }
};

const getAll = async (req, res) => {
  const response = await Category.find();
  res.send({
    message: "all categories",
    data: response,
  });
};

const getCategory = async (req, res) => {
    const categoryId = req.params.id;
    console.log(categoryId);
  try {
  
    const getone = await Category.findById(categoryId);
    console.log(getone);
    res.send({
      message: "the category:",
      data: getone,
    });
  } catch (error) {
    res.send({
      message: "category not found",
    });
  }
};

const deleteCategory = async (req, res) => {
   const categoryId = req.params.id;
  try {
   
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    res.send({
      message: "the category was deleted",
      data: deleteCategory,
    });
  } catch (error) {
    res.send({
      message: "category not found??",
    });
  }
};

const editCategory = async (req, res) => {
    const id = req.params.id;
  try {
  
    const updateCategory = await Category.findByIdAndUpdate(id, req.body);
    res.send({
      message: "Category updated",
      data: updateCategory,
    });
  } catch (error) {
    res.send({
      message: "Update failed",
    });
  }
};

export default {
  addCategory,
  getCategory,
  getAll,
  deleteCategory,
  editCategory,
};
