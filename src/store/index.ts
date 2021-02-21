import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import user from '@/store/user'
import product from '@/store/product'
import ingredient from '@/store/ingredient'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {loading: false, error: null},
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    setError({commit}, payload) {
      commit('setError', payload)
    },
    clearError({commit}) {
      commit('clearError')
    }
  },
  modules: {
    user,
    product,
    ingredient
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
