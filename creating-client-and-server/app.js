const http = require('http')

const host = '127.0.0.1'
const port = 7000

function notFound(res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not found\n')
}

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET': {
      switch (req.url) {
        case '/home': {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('Home page\n')
          break
        }
        case '/about': {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('About page\n')
          break
        }
        default: {
          notFound(res)
          break
        }
      }

      break
    }
    case 'POST': {
      switch (req.url) {
        case '/api/admin': {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('Create admin request\n')
          break
        }
        case '/api/user': {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain')
          res.end('Create user request\n')
          break
        }
        default: {
          notFound(res)
          break
        }
      }

      break
    }
    default: {
      notFound(res)
      break
    }
  }
})

server.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`)
})