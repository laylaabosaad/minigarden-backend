import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

const getCartItems = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .populate("userId", "fullname");
   
      
    if (cart && cart.items.length > 0) {
      res.send({cart});
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const getAllCarts = async (req, res) => {
  
  try {
    const carts = await Cart.find()
      .populate("items.productId")
      .populate("userId", "fullname");
    res.status(201).send({ message: "All carts", data: carts })
    }
   catch (err) {
    res.status(500).send("It didnt work");
  }
};

//add items to the cart

const addCartProduct = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;
  console.log(productId, quantity);

  try {
    let cart = await Cart.findOne({userId: userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    const name = item.title;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.productId.toString() == productId.toString());
      // console.log(itemIndex)

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += 1;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};



const increaseinCart = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;
  console.log(productId, quantity);

  try {
    let cart = await Cart.findOne({ userId: userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    console.log("price:", price)
    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex(
        (p) => p.productId.toString() == productId.toString()
      );
      console.log(itemIndex);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += 1;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, quantity, price});
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one 
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};








const deleteItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    console.log(itemIndex);

    if (itemIndex > -1) {
      const productItem = cart.items[itemIndex];
      const product = await Product.findById(productItem.productId);

      if (productItem.quantity == 1) {
        cart.items.splice(itemIndex, 1);
      } else if (productItem.quantity > 1) {
        productItem.quantity -= 1;
      }

      cart.bill -= product.price;
    }

    await cart.save();

    return res.status(200).send(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item from cart");
  }
};

export default { getCartItems, addCartProduct, getAllCarts, deleteItem, increaseinCart};
