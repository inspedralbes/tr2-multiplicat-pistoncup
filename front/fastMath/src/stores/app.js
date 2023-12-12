import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
    },
    connectedUsers: [],
  }),
  actions: {
    setLoginInfo({ loggedIn, username, image }) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
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
