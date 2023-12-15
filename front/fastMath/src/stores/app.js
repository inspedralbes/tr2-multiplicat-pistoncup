import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
      points: 0,
      position: 0,
    },
    connectedUsers: [],
  }),
  actions: {
    setLoginInfo( loggedIn, username ) {      
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
      this.loginInfo.points = 0;
      this.loginInfo.position = 0;
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

    addUser(user) {
      this.connectedUsers.push(user);
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
  },
});
