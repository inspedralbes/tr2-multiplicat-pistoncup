import { ref, computed } from 'vue'
import { defineStore } from 'pinia';


export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
      points: 0,
      position: 0,
      coche: '',
    },
    connectedUsers: [],
    loggedInUsers: [],
    Ranking: [],
    cocheNumber: 1,
  }),
  getters: {
    // Nuevo getter para obtener la posición actual del usuario
    getPosition: (state) => state.position,
  },
  actions: {
    setLoginInfo(loggedIn, username) {
      const numeroCoche=this.connectedUsers.length+1;
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
      this.loginInfo.points = 0;
      this.loginInfo.position = 0;
      console.log("numero de coches" + numeroCoche);
      this.loginInfo.coche = `/img/coches/${numeroCoche}.png`;
      
    },
    isLoggedIn() {
      return this.loginInfo.loggedIn;
    },
    getLoginInfo() {
      return this.loginInfo;
    },
    getConnectedUsers() {
      return this.connectedUsers;
    },
    setUsers(users) {
      this.connectedUsers = users;
    },
    setRanking(ranking) {
      this.Ranking = ranking;
    },
   
   

    removeUser(userId) {
      const index = this.connectedUsers.findIndex((user) => user.id === userId);
      if (index !== -1) {
        this.connectedUsers.splice(index, 1);
      }
    },
    updateConnectedUsers(users) {
      this.setUsers(users);
    },
    addLoggedInUser(user) {
      this.cocheNumber=this.connectedUsers.length+1;
      console.log("numero de coches" + this.cocheNumber);
      // Validar si el usuario ya está en la lista antes de agregarlo
      const existingUser = this.loggedInUsers.find(u => u.id === user.id);
      if (!existingUser) {
        this.loggedInUsers.push(user);
      }
    },

    removeLoggedInUser(userId) {
      const index = this.loggedInUsers.findIndex((user) => user.id === userId);
      if (index !== -1) {
        this.loggedInUsers.splice(index, 1);
      }
    },

    updateLoggedInUsers(users) {
      this.loggedInUsers = users;
    },
  },
});
