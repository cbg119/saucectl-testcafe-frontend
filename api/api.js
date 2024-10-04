const express = require("express")
const { exec, spawn } = require("child_process")

//SET THIS TO YOUR TESTCAFE/SAUCECTL FOLDER
const TEST_CAFE_PATH = "/Users/christian/Desktop/dev/saucectl-testcafe-frontend/testcafe"

const app = express()
const PORT = 3001

app.use(express.json())

app.post("/run-tests", async (req, res) => {
    console.log("Running tests...")

    //exec() buffers output, this is not what we want.
    //To extract job id/details in realtime, we should use spawn().
    /*
    exec("saucectl run", { cwd: TEST_CAFE_PATH }, (error, stdout, stderr) => {
        res.send(stdout)
    })
    */

    const run_command = spawn("saucectl", ["run"], { cwd: TEST_CAFE_PATH })

    run_command.stdout.on("data", data => res.write(data))
    run_command.stderr.on("data", data => res.write(data))
    run_command.on("close", _ => res.end())
})

app.listen(PORT, _ => {
    console.log(`API listening on port ${PORT}`)
})