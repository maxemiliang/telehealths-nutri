import createStore, { Store } from "unistore"
import { Result } from "@zxing/library"

export interface AppState {
    user: any
    isScanning: boolean
    currentProduct: object
}

const initalState: AppState = { user: null, isScanning: false, currentProduct: null }

export let store: Store<AppState> = createStore(initalState)

export let actions = {
    // Actions can just return a state update:
    setUser: ({ user }): any => ({
        user: user
    }),
    setScanning: ({ isScanning }): any => ({
        isScanning: !isScanning
    })
}
