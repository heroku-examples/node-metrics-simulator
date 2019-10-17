'use strict'

const http = require('http')
const server = http.createServer(onRequest)
const port = +process.env.PORT || 5000
const loaderVerification = process.env.LOADER_IO || 'loader'

function onRequest (req, res) {
  if (req.url === `/${loaderVerification}.txt`) {
    res.writeHead(200, { 'Content-Type': 'application/text' })
    res.end(loaderVerification)
    return
  }

  if (Math.random() > 0.99995) {
    throw new Error('Uncaught Exception!')
  } else if (Math.random() > 0.95 && Math.random() < 0.99) {
    res.writeHead(Math.random() > 0.8 ? 500 : 404, { 'Content-Type': 'text/html' })
    res.end('not found or error')
  } else {
    const time = Math.random() * 100
    blockCpuFor(time).then(() => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end('ok')
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
