import { expect } from 'chai'

import DMX from './../src/electron/dmx'

before( () => {
  DMX.setInterface('0.0.0.0')
})

describe("Major Protocol Tests", () => {
  describe("Joing Protocol Test", () => {
    it("sends e131", (done) => {
      DMX.send(1, [0, 128, 255])

      done()
    })

    it("sends artNet", (done) => {
      DMX.send(1, [0, 128, 255])

      done()
    })

    it("sends both", (done) => {
      DMX.send(1, [0, 128, 255])

      done()
    })

    it("Sends a blackout after 5 seconds", (done) => {
      DMX.setInterface('0.0.0.0')
      DMX.send(1, [255, 128, 16])
      setTimeout(()=>{
        const test = DMX.send(1, [0,0,0])
        expect(test).to.equal(true, `The test should have send a value ${test}`)
        done()
      }, 5000)
    }).timeout(6000)
  })
})