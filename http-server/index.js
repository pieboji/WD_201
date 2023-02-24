/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
const http = require("http")
const minimistargs = require("minimist")
const fs = require("fs")
let homeContent = ""
let projectContent = ""
let registrationContent=""

const argument = minimistargs(process.argv.slice(1), {
  default: {
    port: 5000
  }
})

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err
  }
  homeContent = home
})

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err
  }
  projectContent = project
})

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err
  }
  registrationContent=registration
})

http.createServer((request, response) => {
  const url = request.url
  response.writeHeader(200, { "Content-Type": "text/html" })
  switch (url) {
    case "/home":
      response.write(projectContent)
      response.end()
      break
    case "/project":
      response.write(projectContent)
      response.end()
      break

    case "/registration":
      response.write(registrationContent)
      response.end()
      break

    default:
      response.write(homeContent)
      response.end()
      break
  }
}).listen(argument.port)
