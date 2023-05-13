import ContactUs from "../models/ContactusModel.js";

const getContactinfo = async (req, res) => {
  try {
    const findall = await ContactUs.find();
    res.send({
      message: "all contact info:",
      data: findall,
    });
  } catch (error) {
    res.send({
      message: "something in contact didnt work",
      error: error,
    });
  }
};

const editContact = async (req, res) => {
    const id = req.params.id;
  try {
  
    const edit = await ContactUs.findByIdAndUpdate(id, req.body);
    res.send({
      message: "edit was successfull",
      data: edit,
    });
  } catch (error) {
    res.send({
      message: "it didnt work???",
      error: error,
    });
  }
};

const addContact = async (req, res) => {

  try {
      const addContact = new ContactUs({
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
      });
    const saveContact = await addContact.save();
    res.send({
      message: "contact info added",
      data: saveContact,
    });
  } catch (error) {
    res.send({
      message: "something went wrong",
      error: error,
    });
  }
};

export default { addContact, getContactinfo, editContact };
