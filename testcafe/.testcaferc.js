module.exports = {
    filter: (testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
        return (
            //Returns tests with prod: true AND applitools: false
            (testMeta.prod == "true" && testMeta.applitools == "false")
            //OR tests that simply contain prod: true
            || (testMeta.prod == "true")
        )
    }
}