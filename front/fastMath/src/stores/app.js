import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
      image: '',
    }
  
  }),
  actions: {
    setLoginInfo({ loggedIn, username, image }) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
      this.loginInfo.image = image;
    },
    isLoggedIn(){
      return this.loginInfo.loggedIn;
    },
    getLoginInfo(){
      return this.loginInfo;
    }
  },
})

