const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const PORT = 3000

const players = []

io.on('connection', (socket) => {
  console.log('User connected')

  socket.on('join', (username) => {
    socket.username = username
    players.push(username)
    updatePlayers()
  })

  socket.on('leave', (username) => {
    const index = players.indexOf(username)
    if (index !== -1) {
      players.splice(index, 1)
      updatePlayers()
    }
  })

  socket.on('updatePlayers', (username) => {
    if (!players.includes(username)) {
      players.push(username)
      updatePlayers()
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
    const index = players.indexOf(socket.username)
    if (index !== -1) {
      players.splice(index, 1)
      updatePlayers()
    }
  })

  function updatePlayers() {
    io.emit('updatePlayers', players)
  }
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
