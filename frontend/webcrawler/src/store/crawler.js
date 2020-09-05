import axios from 'axios'

// import axios from axios
export const crawler = {
  state: {
    scrapData: []
  },
  getters: {
    fetchedScrapData (state) {
      return state.scrapData
    }
  },
  actions: {
    getScrapData ({ commit }, state) {
      const dataToSend = {
        urls: ['https://www.upl-ltd.com/'],
        tags: ['h2', 'h3', 'h4']
      }

      axios.post('https://web-crawler-plum.vercel.app/api', dataToSend).then(res => {
        const response = res.data
        commit('SCRAPPEDDATA', response)
        console.log(response)
      })
    }
  },

  mutations: {
    SCRAPPEDDATA (state, payload) {
      state.scrapData = payload
    }
  }
}
