const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Course = require("../models/Course")
const Bootcamp = require("../models/Bootcamp")

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
	let query

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId })
	} else {
		// query = Course.find().populate("bootcamp")
		query = Course.find().populate({
			path: "bootcamp",
			select: "name description"
		})
	}

	const courses = await query

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	})
	// // Copy req.query
	// const reqQuery = { ...req.query }

	// // Fields to exclude from matching
	// const removeFields = ["select", "sort", "page", "limit"]

	// // Loop over removeFields and delete them from reqQuery
	// removeFields.forEach(param => delete reqQuery[param])

	// // Create query string
	// let queryString = JSON.stringify(reqQuery)

	// // Create operators ($gt, $gte, etc.)
	// queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

	// // Finding resource
	// query = Course.find(JSON.parse(queryString))

	// // Select Fields
	// if (req.query.select) {
	// 	const fields = req.query.select.split(",").join(" ")
	// 	query = query.select(fields)
	// }

	// // Sort
	// if (req.query.sort) {
	// 	const sortBy = req.query.sort.split(",").join(" ")
	// 	query = query.sort(sortBy)
	// } else {
	// 	query = query.sort("-createdAt")
	// }

	// // Pagination
	// const page = parseInt(req.query.page, 10) || 1
	// const limit = parseInt(req.query.limit, 10) || 1
	// const startIndex = (page - 1) * limit
	// const endIndex = page * limit
	// const total = await Course.countDocuments()

	// query.skip(startIndex).limit(limit)

	// // Excecute query
	// const courses = await query

	// // Pagination result
	// const pagination = {}
	// if (endIndex < total) {
	// 	pagination.next = {
	// 		page: page + 1,
	// 		limit
	// 	}
	// }

	// if (startIndex > 0) {
	// 	pagination.prev = {
	// 		page: page - 1,
	// 		limit
	// 	}
	// }

	// res.status(200).json({ success: true, count: courses.length, pagination, data: courses })
})

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id).populate({
		path: "bootcamp",
		select: "name description"
	})
	if (!course) {
		return next(new ErrorResponse(`Course not found with id of ${req.params.id}.`, 404))
	}
	res.status(200).json({ success: true, data: course })
})

// @desc    Create new course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
	req.body.bootcamp = req.params.bootcampId

	const bootcamp = await Bootcamp.findById(req.params.bootcampId)

	if (!bootcamp) {
		return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`), 404)
	}
	const course = await Course.create(req.body)

	res.status(201).json({
		success: true,
		data: course
	})
})

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	if (!course) {
		return next(new ErrorResponse(`Course not found with id of ${req.params.id}.`, 404))
	}
	res.status(200).json({ success: true, data: course })
})

// @desc    Delete course
// @route   DELETE /api/v1/course/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findByIdAndDelete(req.params.id)
	if (!course) {
		return next(new ErrorResponse(`Course not found with id of ${req.params.id}.`, 404))
	}
	res.status(200).json({ success: true, data: {} })
})
