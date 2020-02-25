import createStore, { Store } from "unistore"
import devtools from "unistore/devtools"
import { Result } from "@zxing/library"

export interface AppState {
    user: any
    isScanning: boolean
    currentProduct: object
    savedMeal: number
    tempValue: number
    userMeals: Record<string, any>
}

const initalState: AppState = {
    user: null,
    isScanning: false,
    currentProduct: null,
    savedMeal: null,
    tempValue: null,
    userMeals: null
}

export let store: Store<AppState> = devtools(createStore(initalState))

export let actions = {
    // Actions can just return a state update:
    setUser: ({ user }): any => ({
        user: user
    }),
    setScanning: ({ isScanning }): any => ({
        isScanning: !isScanning
    })
}
