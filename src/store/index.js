import Vue from 'vue'
import Vuex from 'vuex'
import axios  from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breeds: {},
    selectedBreed: null,
    selectedDog: null,
    nextDog: null,
    previousDogs: [],
  },
  getters: {
    breeds: state => state.breeds,
    selectedBreed: state => state.selectedBreed,
    selectedDog: state => state.selectedDog,
    nextDog: state => state.nextDog,
    previousDogs: state => state.previousDogs,
  },
  mutations: {
    setBreeds(state, breeds) {
      state.breeds = breeds
    },
    setSelectedBreed(state, breed) {
      state.selectedBreed = breed
    },
    setSelectedDog(state, dog) {
      state.selectedDog = dog
    },
    setNextDog(state, dog) {
      state.nextDog = dog
    },
    setPreviousDogs(state, dogs) {
      state.previousDogs = dogs
    }
  },
  actions: {
    async fetchBreeds({ commit }) {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all')
      commit('setBreeds', response.data.message)
    }
  },
  modules: {
  }
})
