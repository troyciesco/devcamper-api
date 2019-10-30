// middleware is a function that has access to the req/res cylce
// @desc    logs request to console
const logger = (req, res, next) => {
	// req.hello = "yo world"
	// console.log("middleware ran")
	console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`)
	next() // necessary for middleware
}

module.exports = logger
