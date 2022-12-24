var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");

router.get('/', HomeController.index);
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findById);
router.post('/user', UserController.create);
router.put('/user', UserController.update);
router.delete('/user/:id', UserController.delete);

module.exports = router;