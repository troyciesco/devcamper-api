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

// Include other resource routers
const courseRouter = require("./courses")

const router = express.Router()

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter)

router.route("/radius/:zipcode/:distance").get(getNearbyBootcamps)

router.route("/:id/photo").put(bootcampPhotoUpload)

router
	.route("/")
	.get(getBootcamps)
	.post(createBootcamp)

router
	.route("/:id")
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp)

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
