import { v4 as uuidv4 } from 'uuid'

const state = () => ({
    all: [],
    favorites: []
})

const getters = {
    active(state) {
        return state.all.filter((task) => task.completed === false)
    },
    completed(state) {
        return state.all.filter((task) => task.completed === true)
    },
    favorite(state) {
        return state.all.filter((task) => task.favorite === true)
    }
}

const actions = {
    fetchTodos(context) {
        return fetch('https://eldenring.fandom.com/api.php?action=query&titles=Locations&prop=revisions&rvprop=content&format=json&rvslots=main&formatversion=2', {
            headers: { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }).then(res => res.json())
            .then((response) => {
                console.log({ response })
                context.commit('active', response.parse.text)
            }).catch((err) => {
                console.log('looks like there was a problem: \n', err);
            });
    },
    addToFavorites(context, payload) {
        const favorites = context.state.favorites
        favorites.push(payload)
        context.commit('updateFavorites', favorites)
    }
}

const mutations = {
    create(state, name) {
        state.all.push({
            id: uuidv4(),
            name,
            completed: false,
            favorite: false,
            location: 'home'
        })
    },
    setTodos(state, todos) {
        state.all = todos
    },
    toggleStatus(state, taskId) {
        const selectedTask = state.all.find((task => task.id === taskId))
        selectedTask.completed = !selectedTask.completed
    },
    toggleFavorite(state, taskId) {
        const selectedTask = state.all.find((task => task.id === taskId))
        selectedTask.favorite = !selectedTask.favorite
    },
    delete(state, taskId) {
        state.all = state.all.filter((task) => task.id !== taskId)
    },
    clearCompleted(state) {
        state.all = state.all.filter((task) => task.completed === false)
    },
    updateFavorites(state, payload) {
        state.favorites = payload
    },
    update(state, taskId) {
        let id = taskId.id
        let completed = taskId.id
        let name = taskId.name

        let findEl = state.todos.find((task) => task.id === taskId)
        if (findEl !== null) {
            if (completed !== undefined) {
                findEl.completed = completed
            }
            if (name !== undefined) {
                findEl.name = name
            }
        }
        else {
            console.log(`todo item ${id} not found`)
        }
    },
    /* moveTodoItem(state, taskId) {
        let id = taskId.id
        let location = taskId.location
    } */
}

export const todos = {
    namespaced: true,
    state, getters, actions, mutations
}