import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos-store', {
  state: () => ({
    todos: [],
    fetching: false
  }),
  getters: {
    results(state) {
      return state.todos
    },
    isFetching(state) {
      return state.fetching
    }
  },
  actions: {
    async fetchTodos() {
      this.fetching = true
      const response = await fetch('http://eldenring.fandom.com/api.php?action=parse&page=Locations&prop=text&format=json&formatversion=2')
      // const response = await fetch('https://eldenring.fandom.com/api.php?action=query&titles=Locations&prop=revisions&rvprop=content&format=json&rvslots=main&formatversion=2')
      try {
        const result = await response.json()
        this.todos = result.parse.text 
      } catch (err) {
        this.todos = []
        console.error('error loading todos', err)
        return err
      }

      this.fetching = false
    }
  }
})
