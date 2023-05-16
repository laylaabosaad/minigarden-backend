import SubCategory from "../models/subcategoryModel.js";

const addsubcategory = async (req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  console.log(title, category);
  try {
    const addsub = new SubCategory({ title, category });
    await addsub.save();

    res.send({
      message: "subcategory created",
      data: addsub,
    });
  } catch (error) {
    res.send({
      message: "subcategory addition failed",
    });
  }
};

const getallSub = async (req, res) => {
  try {
    const findsub = await SubCategory.find().populate({
      path: "category",
      select: "title",
    });
    res.send({
      message: "all subCategories:",
      data: findsub,
    });
  } catch (error) {
    res.send({
      message: "no subcategories",
    });
  }
};

const getASub = async (req, res) => {
  const category_id = req.params.category_id; // Use the correct parameter name
  console.log(category_id);
  try {
    const getSub = await SubCategory.find({ category: category_id }).populate({
      path: "category",
      select: "title",
    });
    console.log(getSub);
    res.send({
      message: "the subcategory of this category",
      data: getSub,
    });
  } catch (error) {
    res.send({
      message: "subcategory not found",
      error: error,
    });
  }
};

const updateSubcategory = async (req, res) => {
  const id = req.params.id;
  const { title, category } = req.body;
  try {
    const editsub = await SubCategory.findByIdAndUpdate(id, {
      title,
      category,
    });
    res.send({
      message: "subcategory edited successfully",
      data: editsub,
    });
  } catch (error) {
    res.send({
      message: "edition failed",
      error: error,
    });
  }
};

const deleteSub = async (req, res) => {
  const id = req.params.id;
  try {
    const deletesub = await SubCategory.findByIdAndDelete(id);
    res.send({
      message: "sub deleted successfully",
      data: deletesub,
    });
  } catch (error) {
    res.send({
      message: "error",
      error: error,
    });
  }
};

export default {
  addsubcategory,
  getallSub,
  getASub,
  deleteSub,
  updateSubcategory,
};
