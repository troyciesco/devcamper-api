const express = require("express")
const dotenv = require("dotenv")

// Load env vars
dotenv.config({ path: "./config/config.env" })

const app = express()

app.get("/", (req, res) => {
	//res.send("hello from express")
	res.status(200).json({ name: "Troy" })
})

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
