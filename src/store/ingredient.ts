import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import firebase from 'firebase'

export class IngredientClass {
  id: string
  name: string
  description: string
  price: number
  checked: boolean
  constructor(id: string, name: string, description: string, price: number, checked: boolean) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.checked = checked
  }
}

interface State {
  ingredientList: Array<IngredientClass>
}

Vue.use(Vuex)

export default {
  state: {
    ingredientList: []
  },
  mutations: {
    loadIngredient(state: State, payload: Array<IngredientClass>) {
      state.ingredientList.push(...payload)
    },
    createIngredient(state: State, payload: IngredientClass) {
      state.ingredientList.push(payload)
    },
    updateIngredient(
      state: State,
      {id, name, description, price, checked}: IngredientClass
    ) {
      const ingredient = state.ingredientList.find(
        (a: IngredientClass) => a.id === id
      )
      if (ingredient !== undefined) {
        ingredient.name = name
        ingredient.description = description
        ingredient.price = price
        ingredient.checked = checked
      }
    },
    updateIngredientList(state: State, id: string) {
      state.ingredientList = state.ingredientList.filter(
        (i: IngredientClass) => i.id !== id
      )
    }
  },
  actions: {
    async fetchIngredients({commit}: {commit: Function}) {
      commit('clearError')
      commit('setLoading', true)

      const resultIngredient: Array<IngredientClass> = []

      try {
        const fbVal = await firebase
          .database()
          .ref('ingredient')
          .once('value')
        const bdIngredient = fbVal.val()

        Object.keys(bdIngredient).forEach(key => {
          const ingredient = bdIngredient[key]
          resultIngredient.push(
            new IngredientClass(
              key,
              ingredient.name,
              ingredient.description,
              ingredient.price,
              ingredient.checked
            )
          )
        })

        commit('loadIngredient', resultIngredient)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async createIngredient(
      {commit}: {commit: Function},
      payload: IngredientClass
    ) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newIngredient = new IngredientClass(
          '',
          payload.name,
          payload.description,
          payload.price,
          payload.checked
        )
        const fbValue = firebase
          .database()
          .ref('ingredient')
          .push(newIngredient)

        commit('setLoading', false)
        commit('createIngredient', {
          ...newIngredient,
          id: fbValue.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateIngredient(
      {commit}: {commit: Function},
      {id, name, description, price, checked}: IngredientClass
    ) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await firebase
          .database()
          .ref('ingredient')
          .child(id)
          .update({
            name,
            description,
            price,
            checked
          })
        commit('updateIngredient', {
          id,
          name,
          description,
          price,
          checked
        })

        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async deleteIngredient({commit}: {commit: Function}, id: string) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const value = await firebase
          .database()
          .ref(`ingredient/${id}`)
          .once('value')
        await firebase
          .database()
          .ref('ingredient')
          .child(id)
          .remove()
        commit('updateIngredientList', id)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ingredientList(state: State) {
      return state.ingredientList
    },
    ingredientById(state: State) {
      return (id: string) =>
        state.ingredientList.find(ingredient => ingredient.id === id)
    }
  }
}
