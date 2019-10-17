'use strict'

const http = require('http')
const server = http.createServer(onRequest)
const port = +process.env.PORT || 5000

function onRequest (req, res) {
  if (Math.random() > 0.99) {
    throw new Error('Uncaught Exception!')
  } else if (Math.random() > 0.8 && Math.random() < 0.99) {
    res.status(Math.random() > 0.7 ? 404 : 500)
    res.send('not found or error')
  } else {
    const time = Math.random() * 500
    blockCpuFor(time).then(() => {
      res.send('ok')
    })
  }
}
function blockCpuFor (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`blocking the event loop for ${ms}ms`)
      const now = new Date().getTime()
      let result = 0
      while (true) {
        result += Math.random() * Math.random()
        if (new Date().getTime() > now + ms) { break }
      }
      resolve(result)
    }, 100)
  })
}

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
