const UserModel = require("../models/User");

exports.get_users = async (req, res, next) => {
	//get users from db
	try {
		const userList = await UserModel.findAll({});
		res.render("users", { userList });
	} catch (error) {
		res.send("An error occured");
	}
};

//on get request
exports.show_add_user_form = (req, res) => {
	res.render("addUser");
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

//o edit request
exports.show_update_user_form = async (req, res) => {
  const id = req.params.id
  const firstName = req.params.firstName
  const lastName = req.params.lastName
	try {
		await res.render("updateUser", {user:{
      id : id,
      firstName : firstName,
      lastName : lastName
    }});
	} catch (err) {console.log("edit Error", err)}
};

exports.update_user =  ((req, res)=>{
  const id = req.params.id
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  try {
    UserModel.update({firstName,lastName},{where:{id:id}})
    res.redirect("/users")
  } catch (err) {
    console.log("update Error", err) 
  }
  
})