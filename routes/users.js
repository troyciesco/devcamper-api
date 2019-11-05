const express = require("express")
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/users")

const User = require("../models/User")

const router = express.Router({ mergeParams: true })

const advancedResults = require("../middleware/advancedResults")
// Require user to be logged in to do certain tasks
const { protect, authorize } = require("../middleware/auth")

// Protects and sets authorize for all routes below this
router.use(protect)
router.use(authorize("admin"))

router
	.route("/")
	.get(advancedResults(User), getUsers)
	.post(createUser)

router
	.route("/:id")
	.get(getUser)
	.put(updateUser)
	.delete(deleteUser)

module.exports = router
