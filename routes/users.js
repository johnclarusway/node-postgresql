var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");

/*  /users */

router.get("/", usersController.get_users);
router.get("/add", usersController.show_add_user_form);
// edit islemini tek requst icerisinde gelen kullaniciyi silip verilen isim soyismi ekleyerek yaptim. update fonksiyonunu ya bulamadim dökümandan ya da kavrayamadim. bu ilk pr oldugu icin en azindan deneyeyim dedim.
router.get('/:id/delete', usersController.delete_user);
router.get('/:id/edit', usersController.edit_user);
router.post('/:id/change', usersController.edit_2_user);


router.post("/add", usersController.add_user);

module.exports = router;
