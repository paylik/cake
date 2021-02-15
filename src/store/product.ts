import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import firebase from 'firebase'
import {VueRouter} from 'vue-router/types/router'
import storage = firebase.storage

export class ProductClass {
  id: string
  name: string
  description: string
  img: File
  constructor(id: string, name: string, description: string, img: File) {
    this.id = id
    this.name = name
    this.description = description
    this.img = img
  }
}

interface State {
  productList: Array<ProductClass>
}

Vue.use(Vuex)

export default {
  state: {
    productList: []
  },
  mutations: {
    loadProducts(state: State, payload: Array<ProductClass>) {
      state.productList.push(...payload)
    },
    createProduct(state: State, payload: ProductClass) {
      state.productList.push(payload)
    },
    updateProduct(state: State, {id, name, description, img}: ProductClass) {
      const product = state.productList.find((a: ProductClass) => a.id === id)
      if(product !== undefined) {
      product.name = name
      product.description = description
      product.img = img}
    },
    updateProductList(state: State, id: string) {
      state.productList = state.productList.filter((i: ProductClass) => i.id !== id);
    },
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
     },
    async createProduct({ commit }: {commit: Function}, payload: ProductClass) {
      commit('clearError')
      commit('setLoading', true)

      const {img} = payload

      try {
        const newProduct = new ProductClass('', payload.name, payload.description, img)
        const fbValue = firebase.database().ref('products').push(newProduct)
        const imgExt = img.name.slice(img.name.length- 3, img.name.length)

        const fileData = await firebase.storage().ref(`products/${fbValue.key}.${imgExt}`).put(img)
        const imgSrc = await firebase.storage().ref(`products/${fbValue.key}.${imgExt}`).getDownloadURL()
        
        if(fbValue.key !== null) {
          await firebase.database().ref('products').child(fbValue.key).update({
            img: imgSrc
          })
        }
        
        commit('setLoading', false)
        commit('createProduct', {
          ...newProduct,
          id: fbValue.key,
          img: imgSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateProduct ({commit}: {commit: Function}, {
      id,
      name,
      description,
      img
    }: ProductClass) {
      commit('clearError')
      commit('setLoading', true)

      try {
        if (img.name) {
          const imgExt = img.name.slice(img.name.length - 3, img.name.length)
          await firebase.storage().ref(`products/${id}.${imgExt}`).put(img)
          const imgSrc = await firebase.storage().ref(`\`products/${id}.${imgExt}\`/${id}.${imgExt}`).getDownloadURL()
          await firebase.database().ref('products').child(id).update({
            name, description, img: imgSrc
          })
        } else {
          await firebase.database().ref('products').child(id).update({
            name, description
          })
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async deleteProduct({ commit }: {commit: Function}, id: string) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const value = await firebase.database().ref(`products/${id}`).once('value');
        const ref = value.val().image;
        const fullName = firebase.storage().refFromURL(`${ref}`).name;
        const file = firebase.storage().ref('products').child(fullName);
        await file.delete();
        await firebase.database().ref('products').child(id).remove();
        commit('updateProductList', id);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    }
  },
  getters: {
    productList(state: State) {
      return state.productList
    },
    productById(state: State) {
      return (id: string) => state.productList.find((product: ProductClass) => product.id === id)
    }
  }
}
