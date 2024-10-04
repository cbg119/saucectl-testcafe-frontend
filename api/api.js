const express = require("express")
const { exec, spawn } = require("child_process")

const TEST_CAFE_PATH = "/Users/christian/Desktop/dev/saucectl-testcafe-frontend/testcafe"

const app = express()
const PORT = 3001

app.use(express.json())

app.post("/run-tests", async (req, res) => {
    console.log("Running tests...")
    exec("saucectl run", { cwd: TEST_CAFE_PATH }, (error, stdout, stderr) => {
        res.send(stdout)
    })
})

app.listen(PORT, _ => {
    console.log(`API listening on port ${PORT}`)
})