import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

const PAGINATION_BY = 12

export default new Vuex.Store({
    state: {
        breeds: {},
        selectedBreed: null,
        dogs: [],
        previousRandomDogs: [],
    },
    getters: {
        breeds: state => state.breeds,
        selectedBreed: state => state.selectedBreed,
        dogs: state => state.dogs,
        previousRandomDogs: state => state.previousRandomDogs,
    },
    mutations: {
        setBreeds(state, breeds) {
            state.breeds = breeds
        },
        setSelectedBreed(state, breed) {
            state.selectedBreed = breed
        },
        setDogs(state, dogs) {
            state.dogs = dogs
        },
        setPreviousRandomDogs(state, dogs) {
            state.previousRandomDogs = dogs
        }
    },
    actions: {
        async fetchBreeds({commit}) {
            const response = await axios.get('https://dog.ceo/api/breeds/list/all')
            if (response.data.status === 'success') {
                commit('setBreeds', response.data.message)
            }
        },
        setSelectedBreed({commit}, breed) {
            commit('setSelectedBreed', breed)
            this.dispatch('fetchDogs')
        },
        async fetchDogs({commit, state}) {
            const response = await axios.get(`https://dog.ceo/api/breed/${state.selectedBreed}/images`)
            if (response.data.status === 'success') {
                const splitForPagination = response.data.message.reduce((all, x, i) => {
                    const dog = Math.floor(i / PAGINATION_BY);
                    all[dog] = [].concat((all[dog] || []), x);
                    return all
                }, [])
                commit('setDogs', splitForPagination)
            }
        },
        addToPreviousRandomDog({commit, state}, dog) {
            commit('setPreviousRandomDogs', [...state.previousRandomDogs, dog])
        },
        async fetchRandomDogImage() {
            return await axios.get('https://dog.ceo/api/breeds/image/random')
        }
    },
    modules: {}
})
