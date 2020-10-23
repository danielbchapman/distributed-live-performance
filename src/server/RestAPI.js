//FIXME we need to install a jwt or other real middleware for security
import fs from 'fs-extra'
import path from 'path'
import {
  WEBSOCKET_SINGLETON
} from './ExpressServer'
export default (app, wss, file) => {
  
  let state = {}

  const readCurrentState = () => {
    try {
      //FIXME we need to use absolute paths...
      const x = path.join(__dirname, '../../', file)
      // console.log(file)
      // const x = path.join(__dirname, file)
      // console.log(x)
      console.log(`PATH -> ${x}`)
      state = JSON.parse(fs.readFileSync( x ) )
    } catch(e) {
      console.log(e)
      state = {}//load defaults
    }
    
    console.log(`write-state: ${file}`, state)  
    return JSON.stringify(state)
  }

  readCurrentState() //startup
  /**
   * Downloads the entire current state of the show
   */
  app.get('/api/download', (req, res) => {
    const json = readCurrentState()
    res.json(json)
  })

  app.put('/api/upload', (req, res) => {
    //we need to do massive checks here
    res.json({not: 'implemented'})
  })

  app.get('/api/currentCue', (req, res) => {
    const q = state.currentCue || -1
    res.json({currentCue: q})
  })

  app.post('/api/replicate', (req, res) => {
    console.log('replicate called')
    if(wss) {
      WEBSOCKET_SINGLETON().sendAll('replicate', {})
    }
    res.json({response:'OK'})
  })
}