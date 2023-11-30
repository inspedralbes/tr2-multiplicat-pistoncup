<template>
    <div>
      <h1>Real-Time Game</h1>
      <div v-if="!joined">
        <label for="username">Username:</label>
        <input v-model="username" id="username" />
        <button @click="joinGame">Join Game</button>
      </div>
      <div v-else>
        <h2>Welcome, {{ username }}!</h2>
        <p>Players in the game: {{ players.join(', ') }}</p>
        <button @click="leaveGame">Leave Game</button>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, watch } from 'vue'
  import { useSocket } from './socket'
  
  export default defineComponent({
    data() {
      return {
        username: '',
        joined: false,
        players: [],
      }
    },
    methods: {
      joinGame() {
        if (this.username) {
          this.joined = true
          useSocket().emit('join', this.username)
        }
      },
      leaveGame() {
        this.joined = false
        useSocket().emit('leave', this.username)
      },
    },
    mounted() {
      const socket = useSocket()
  
      socket.on('updatePlayers', (players) => {
        this.players = players
      })
  
      watch(
        () => this.joined,
        (joined) => {
          if (joined) {
            socket.emit('updatePlayers', this.username)
          }
        }
      )
    },
  })
  </script>
  
  <style>
    /* Add your styles here */
  </style>