const SOCKET_PORT = 53007
const SERVER_PORT = 9001
console.log('----------starting node server on 9001, websockets on 53007')

import ExpressServer from './ExpressServer'

const _testFile = '/temp/test.json'
const app = ExpressServer(SOCKET_PORT, SERVER_PORT, 'TEST_PASSWORD', _testFile)