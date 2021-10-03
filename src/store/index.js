import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: []
  },
  mutations: {
    setCharacter(state, payload) {
      state.characters = payload
    },
    setCharactersFilter(state, payload) {
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({ commit }) {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        commit('setCharacter', data.results)
        commit('setCharactersFilter', data.results)
      } catch (error) {
        console.log(error)
      }
    },
    filterByStatus({commit, state}, status){
      /*crea un nuevo array con todos los elementos que cumplan la 
      condición implementada por la función dada.*/
      const results = state.characters.filter((character) => {
        /*determina si una matriz incluye un determinado elemento, 
        devuelve true o false según corresponda*/
        return character.status.includes(status)
      })
      commit('setCharactersFilter', results)
    },
    filterByName({commit, state}, name) {
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase()

        if(characterName.includes(formatName)){
          return character
        }
      })
      commit('setCharactersFilter', results)
    }
  },
  modules: {
  }
})
