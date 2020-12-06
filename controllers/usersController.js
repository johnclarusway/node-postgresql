const UserModel = require("../models/User");

exports.get_users = async (req, res, next) => {
  //get users from db
  try {
    const userList = await UserModel.findAll({
       order: [
          ['id', 'ASC'],
      ]
  });
    res.render("users", { userList });
  } catch (error) {
    res.send("An error occured");
  }
};

//on get request
exports.show_add_user_form = (req, res) => {
  res.render("addUser", { user: undefined });
};

//on post request
exports.add_user = async (req, res) => {
  // add to db
  try {
    const newUser = await UserModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.redirect("/users");
  } catch (error) {
    res.send("An error occured.");
  }
};

//on delete request
exports.delete_user = async (req, res) => {
  try {
    await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/users");
  } catch (error) {
    console.log("error", error);
  }
};

//on edit request
exports.show_edit_user_page = async (req, res) => {
  try {
    const user = await UserModel.findOne({ where: { id: req.params.id } });
    res.render("addUser", { user });
  } catch (error) {
    res.send("An occur occured");
  }
};

exports.edit_user = async (req, res) => {
  let updatedObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  try {
    let result = await UserModel.update(updatedObject, {
      returning: true,
      where: { id: req.params.id },
    });
    res.redirect("/users");
  } catch (error) {
    res.send("An error occured.");
  }
};

