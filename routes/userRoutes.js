const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const { deleteUser, getAUser, getUsers } = require('../controllers/userController');
const router = express.Router();


router.get("/", getUsers);
router.get("/:id", getAUser);
router.delete("/:id",  deleteUser); 

module.exports = router;  