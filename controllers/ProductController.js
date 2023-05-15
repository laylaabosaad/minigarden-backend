import Product from "../models/ProductModel.js";

import { v2 as cloudinary } from "cloudinary";
import path from "path";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



const getProduct = async (req, res) => {
  const response = await Product.find({})
    .populate({ path: "category", selectt: "title" })
    .populate({ path: "subcategory", select: "title" });;
  return res.send({ status: 200, data: response });
};

const addProduct = async (req, res) => {
  const { title, price, description, stock, category, subcategory } = req.body;
  const result = await cloudinary.uploader.upload(req.file.path);

  try {
    const response = new Product({
      title: title,
      price: price,
      stock: stock,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      subcategory: subcategory,
      description: description,
      category: category,
    });
    const savedProduct = await response.save();
    res.json({
      message: "Product added successfully",
      status: 200,
      data: savedProduct,
    });
  } catch (error) {
    res.send({
      message: "Product addition failed",
      error: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    res.send({
      message: "Product deleted successfully",
      status: 200,
      data: deleteProduct,
    });
  } catch (error) {
    res.send({
      message: "DEletion failed",
      error: error,
    });
  }
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const Oneproduct = await Product.findById(id)
    
      .populate({ path: "category", select: "title" })
      .populate({ path: "subcategory", select: "title" });
    console.log(Oneproduct);
    res.send({
      message: "THe Product:",
      data: Oneproduct,
    });
  } catch (error) {
    res.send({
      message: "Product doesn't exist",
      error: error,
    });
  }
};

const getproductByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const findbyCategory = await Product.find({category:categoryId}).populate({ path:"category",select: "title"}). populate({path:"subcategory", select:"title"})
    res.send({
      message: "the category products",
      data:findbyCategory
    })
    
  } catch (error) {
    res.send({
      message: "categoryProduct not found",
      error:error
    })
    
  }
  
}









const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const update = await Product.findByIdAndUpdate(productId, req.body);
    res.send({
      message: "Product edited successfully",
      status: 200,
    });
  } catch (error) {
    res.send({
      message: "Deletion failed",
      error: error,
    });
  }
};

export default {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
  getproductByCategory
};
