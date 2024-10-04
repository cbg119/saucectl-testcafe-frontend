const express = require("express")
const { exec, spawn } = require("child_process")
const { url } = require("inspector")

//SET THIS TO YOUR TESTCAFE/SAUCECTL FOLDER
const TEST_CAFE_PATH = "/Users/christian/Desktop/dev/saucectl-testcafe-frontend/testcafe"

HTTPS_REGEX = /https:\/\/[^\s/$.?#].[^\s]*/gi

const app = express()
const PORT = 3001

app.use(express.json())

app.post("/run-tests", async (req, res) => {
    console.log("### RUNNING TESTS... ###")

    //exec() buffers output, this is not what we want.
    //To extract job id/details in realtime, we should use spawn().
    /*
    exec("saucectl run", { cwd: TEST_CAFE_PATH }, (error, stdout, stderr) => {
        res.send(stdout)
    })
    */

    const run_command = spawn("saucectl", ["run"], { cwd: TEST_CAFE_PATH })

    run_command.stdout.on("data", (data) => {
        if (data.includes("Suite started.")) {
            //Parse string for test URL, can be further parsed for job ID
            test_urls = (String(data)).match(HTTPS_REGEX)
            console.log("Started a test - " + test_urls[0])
        }

        if (data.includes("Suite finished.")) {
            //Parse string for test URL, can be further parsed for job ID
            test_urls = (String(data)).match(HTTPS_REGEX)
            console.log("Finished a test - " + test_urls[0])
        }
    })
    //should be implemented later
    //run_command.stderr.on("data", data => res.write(data))
    run_command.on("close", _ => {
        console.log("### TESTS HAVE ENDED ###")
        res.end()
    })
})

app.listen(PORT, _ => {
    console.log(`API listening on port ${PORT}`)
})