const car = require("@ipld/car")
const Ipfs = require("ipfs-core")
const fs = require("fs")

async function loadCAR(filepath, ipfs) {
    const inStream = fs.createReadStream(filepath)
    for await (const { cid, bytes } of await car.CarBlockIterator.fromIterable(inStream)) {
        console.log("read", cid.toString())
    }
}

describe("read a car file", () => {
    it("tests", async () => {
        const ipfs = await Ipfs.create({ offline: true })
        await loadCAR("fixture.car", ipfs)
        await ipfs.stop()
    })
})
