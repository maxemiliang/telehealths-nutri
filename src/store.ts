import createStore from "unistore"

export let store = createStore({ user: null })

export let actions = {
    // Actions can just return a state update:
    setUser: ({ user }): any => ({
        user: user
    })
}

const { NODE_ENV } = process.env
if (NODE_ENV === "development") {
    store.subscribe(console.log)
}
