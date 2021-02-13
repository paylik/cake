import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import {VueRouter} from 'vue-router/types/router'
import storage = firebase.storage

class ProductClass {
  id: string
  name: string
  description: string
  img: File | null
  constructor(id: string, name: string, description: string, img: File | null) {
    this.id = id
    this.name = name
    this.description = description
    this.img = img
  }
}

Vue.use(Vuex)

export default {
  state: {
    productList: []
  },
  mutations: {
    loadProducts(state: Storage, payload: Array<ProductClass>) {
      state.productList.push(...payload)
    },
    createProduct(state: Storage, payload: ProductClass) {
      state.productList.push(payload)
    },
    updateProduct(state: Storage, {id, name, description, img}: ProductClass) {
      const product = state.productList.find((a: ProductClass) => a.id === id)
      product.name = name
      product.description = description
      product.img = img
    }
  },
  actions: {
    async fetchProducts({commit}: {commit: Function}) {
      commit('clearError')
      commit('setLoading', true)

      const resultProducts: Array<ProductClass> = []

      try {
        const fbVal = await firebase
          .database()
          .ref('products')
          .once('value')
        const bdProducts = fbVal.val()

        Object.keys(bdProducts).forEach(key => {
          const product = bdProducts[key]
          resultProducts.push(
            new ProductClass(
              key,
              product.name,
              product.description,
              product.img
            )
          )
        })

        commit('loadProducts', resultProducts)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {}
}
