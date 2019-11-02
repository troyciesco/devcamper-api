const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const geocoder = require("../utils/geocoder")
const Bootcamp = require("../models/Bootcamp")

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
// exports.getBootcamps = async (req, res, next) => {
// 	try {
// 		const bootcamps = await Bootcamp.find()
// 		res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
// 	} catch (err) {
// 		next(err)
// 	}
// }
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find()
	res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
})

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id)
	if (!bootcamp) {
		// return res.status(400).json({ success: false })
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}.`, 404))
	}
	res.status(200).json({ success: true, data: bootcamp })
})

// @desc    Get bootcamps within a raduis
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getNearbyBootcamps = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params

	// Get lat/lng from geocoder
	const loc = await geocoder.geocode(zipcode)
	const lat = loc[0].latitude
	const lng = loc[0].longitude

	// Calc radius using radians
	// Divide distance by radius of the earth
	// Radius of Earth = 3,963 mi / 6,378 km
	const radius = distance / 3963
	const bootcamps = await Bootcamp.find({
		location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
	})

	res.status(200).json({
		success: true,
		count: bootcamps.length,
		data: bootcamps
	})
})

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
// TODO: compare async await to .then
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body)
	res.status(201).json({
		success: true,
		data: bootcamp
	})
})

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}.`, 404))
	}
	res.status(200).json({ success: true, data: bootcamp })
})

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}.`, 404))
	}
	res.status(200).json({ success: true, data: {} })
})
