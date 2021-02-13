import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

class User {
  private id: string
  constructor(id: string) {
    this.id = id
  }
}

Vue.use(Vuex)

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state: Storage, payload: User) {
      state.user = payload
    }
  },
  actions: {
    async loginUser(
      {commit}: {commit: Function},
      {name, password}: {name: string; password: string}
    ) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(name, password)
        commit('setUser', new User(user.user!.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser({commit}: {commit: Function}, payload: any) {
      commit('setUser', new User(payload.uid))
    },
    logout({commit}: {commit: Function}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state: Storage) {
      return state.user
    },

    isUserLogin(state: Storage) {
      if (state.user) {
        const s: boolean = state.user.id === 'bmpRW0nCNUZBRgCPe2cxtQa3Cq72'
        return s
      }
    }
  }
}
