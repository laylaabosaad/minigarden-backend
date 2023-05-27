import UserContact from "../models/UserContactUs.js";

const sendmessage = async (req, res) => {
 

  try {
      const addContact = new UserContact ({
        fullname: req.body.fullname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        message: req.body.message,
      });
    const saveContact = await addContact.save();
    res.send({
      message: "Thank you for contacting us",
      data: saveContact,
    });
  } catch (error) {
    res.send({
      message: "something went wrong. Try again later",
      error: error,
    });
  }
};


const deletemssg = async (req, res) => {
  const mssgid = req.params.id;
  try {
    const removemssg = await UserContact.findByIdAndDelete(mssgid);
    res.send({
      message: "message deleted successfully",
      data: removemssg,
    });
  } catch (error) {
    res.send({
      message: "THe message did not delete",
      error: error.message,
    });
  }
};


const getUsermssg = async (req, res) => {
  try {
    const findall = await UserContact.find({});
    res.send({
      message: "All users' messages:",
      data: findall,
    });
  } catch (error) {
    res.send({
      message: "something in contact didnt work",
      error: error,
    });
  }
};


export default { sendmessage, getUsermssg, deletemssg };
