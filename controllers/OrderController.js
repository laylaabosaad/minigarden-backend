import Cart from "../models/CartModel.js";
import orders from "../models/OrderModel.js";

const getAllOrders = async (req, res) => {
  const allorders = await orders.find({});
  res.send({
    message: "All orders:",
    data: allorders,

  });
  
};

const deleteOrder = async (req, res) => {
  const orderid = req.params.id
  try {
    const removeorder = await orders.findByIdAndDelete(orderid)
    res.send({
      message: "order deleted successfully",
      data:removeorder
    })
    
  } catch (error) {
    res.send({
      message: "order not found?",
      error:error.message
      
    })
  }
 
  
}

const getanOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const findorder = await orders.findById(orderId)
    res.send({
      message: "the order:",
      data:findorder
    })
   
  } catch (error) {
    res.send({
      message: "order not found",
      error:error.message
    })
    
 }
};


const getClientOrder = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orderClient= await orders.find({user:userId})
    res.send({
      message: "the client's order",
      data:orderClient
    })
    
  } catch (error) {
    res.send({
      message: "Client has no orders",
      error:error
    })
    
  }
}


const checkout = async (req, res) => {
  const userId = req.params.id;
  const { phonenumber, address, notes } = req.body;
  console.log(userId);

  let cart = await Cart.findOne({ userId: userId });
  if (cart && cart.items.length > 0) {
    let createorder = await orders.create({
      userId: cart.userId,
      bill: cart.bill,
      items: cart.items,
      quantity: cart.quantity,
      phonenumber: phonenumber,
      address: address,
      notes: notes,
    });

    // const data = await Cart.findByIdAndDelete({ _id: cart.id });
    // return res.status(201).send(createorder);

    if (createorder) {
      await Cart.updateOne(
        { userId: userId },
        { $set: { bill: 0, items: [], quantity: 0 } }
      );
      res.send({
        message: "checkout was successful",
        data: createorder,
      });
    }
  } else if (!cart) {
    res.send({
      message: "add items to the cart",
    });
  } else {
    res.send({
      message: "checkout went wrong",
    });
  }
};

export default { getAllOrders, checkout, getanOrder, deleteOrder, getClientOrder};
