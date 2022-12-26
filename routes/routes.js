const express = require("express")
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAuth");

router.get('/users', AdminAuth, UserController.findAll);
router.get('/user/:id', AdminAuth, UserController.findById);
router.post('/recover-password', UserController.recoverPassword);
router.post('/user', UserController.create);
router.post('/change-password', UserController.changePassword);
router.post('/login', UserController.login);
router.put('/user', UserController.update);
router.delete('/user/:id', AdminAuth, UserController.delete);


module.exports = router;