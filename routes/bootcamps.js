const express = require("express")
const {
	getBootcamps,
	getBootcamp,
	getNearbyBootcamps,
	createBootcamp,
	updateBootcamp,
	deleteBootcamp,
	bootcampPhotoUpload
} = require("../controllers/bootcamps")

const Bootcamp = require("../models/Bootcamp")

// Include other resource routers
const courseRouter = require("./courses")

const router = express.Router()

const advancedResults = require("../middleware/advancedResults")
// Require user to be logged in to do certain tasks
// Also require certain roles
const { protect, authorize } = require("../middleware/auth")

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter)

router.route("/radius/:zipcode/:distance").get(getNearbyBootcamps)

router.route("/:id/photo").put(protect, authorize("publisher", "admin"), bootcampPhotoUpload)

router
	.route("/")
	// .get(getBootcamps)
	// takes in the model and anything you want to populate
	.get(advancedResults(Bootcamp, "courses"), getBootcamps)
	.post(protect, authorize("publisher", "admin"), createBootcamp)

router
	.route("/:id")
	.get(getBootcamp)
	.put(protect, authorize("publisher", "admin"), updateBootcamp)
	.delete(protect, authorize("publisher", "admin"), deleteBootcamp)

// router.get("/", (req, res) => {
// 	//res.send("hello from express")
// 	res.status(200).json({ success: true, msg: "Show all bootcamps" })
// })

// router.get("/:id", (req, res) => {
// 	//res.send("hello from express")
// 	res.status(200).json({ success: true, msg: `Show bootcamp ${req.params.id}` })
// })

// router.post("/", (req, res) => {
// 	//res.send("hello from express")
// 	res.status(200).json({ success: true, msg: "Create new bootcamp" })
// })

// router.put("/:id", (req, res) => {
// 	//res.send("hello from express")
// 	res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` })
// })

// router.delete("/:id", (req, res) => {
// 	//res.send("hello from express")
// 	res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
// })

module.exports = router
