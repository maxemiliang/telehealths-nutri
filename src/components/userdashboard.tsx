import { Component, h, Ref, RefObject } from "preact"
import { useRef } from "preact/hooks"
import { useAction, useSelector, useStore } from "@preact-hooks/unistore"
import { AppState, actions } from "./../store"
import OpenFoodAPI, { defaultOptions } from "./../off"
import Header from "./DashboardComponents/header"
import Product from "./DashboardComponents/product"
import Button from "./../elements/button"
import { BrowserBarcodeReader, Exception, Result } from "@zxing/library"
import * as Sentry from "@sentry/browser"
import { Store } from "unistore"
import { auth, db } from "./../firebase"
import StatusAlert, { StatusAlertService } from "preact-status-alert"
import { syncMeal } from "../apiCalls"
import MealsList from "./DashboardComponents/mealslist"
import Graphs from "./DashboardComponents/graphs"

export default class UserDashboard extends Component {
    public video: RefObject<HTMLVideoElement> = useRef()
    public currentStore: any
    public hasError: boolean = false
    public eventId: any
    public setScanning: any
    public setProduct: any
    public setUser: any
    public Api: OpenFoodAPI = new OpenFoodAPI(defaultOptions)
    public store: Store<AppState> = useStore()
    public unsub: any

    public handleScan(e): void {
        const files: FileList = e.target.files
        if (files.length > 0) {
            const reader = new FileReader()
            const file: File = e.target.files[0]
            const codeReader = new BrowserBarcodeReader()

            const result = (reader.onload = async (): Promise<void> => {
                const fileData: string | ArrayBuffer = reader.result
                try {
                    const result = await codeReader.decodeFromImageUrl(fileData.toString())
                    console.log(result)
                } catch (err) {
                    console.error(err)
                }
            })

            reader.readAsDataURL(file)
        }
    }

    public componentDidUpdate(): void {
        if (this.currentStore.isScanning && !this.currentStore.currentScan) this.setupScanner()
        if (this.currentStore.user && !this.unsub) {
            this.unsub = db
                .collection("user_data")
                .where("userId", "==", this.currentStore.user.uid)
                .onSnapshot(snapshot => {
                    if (!snapshot.empty) {
                        let meals
                        snapshot.forEach(doc => {
                            meals = doc.data()
                        })
                        this.store.setState({ userMeals: meals })
                    }
                })
                .bind(this)
        }
    }

    public async componentDidMount() {
        this.setScanning = useAction(actions.setScanning)
        this.store.subscribe(async appState => {
            if (appState.savedMeal != null) {
                StatusAlertService.showSuccess("Saved meal")
                await syncMeal(appState.currentProduct, appState.savedMeal)
                this.store.setState({ savedMeal: null, tempValue: null })
            }
        })
    }

    public async setupScanner(): Promise<void> {
        const codeReader = new BrowserBarcodeReader()
        try {
            const result = await codeReader.decodeOnceFromVideoDevice(undefined, this.video.current)
            this.setScanning(false)
            codeReader.reset()
            codeReader.stopAsyncDecode()
            await this.fetchResults(result)
        } catch (err) {
            console.error(err)
        }
    }

    public async fetchResults(result: Result): Promise<void> {
        console.log("Result: ", result)
        const product = await this.Api.getProduct(result.getText())
        if (product.status === 1) this.store.setState({ currentProduct: product })
        else StatusAlertService.showError("Product not found")
    }

    public componentDidCatch(error: any): void {
        this.hasError = true
        Sentry.withScope(scope => {
            const eventId = Sentry.captureException(error)
            this.eventId = eventId
        })
    }

    public componentWillUnmount() {
        this.unsub()
    }

    public render(): JSX.Element {
        this.currentStore = useSelector("user,isScanning,currentProduct,userMeals")
        let p = this.currentStore.currentProduct
        console.log(p)
        return (
            <div>
                <StatusAlert />
                <div class="w-screen h-screen gradient-2 flex justify-center items-center">
                    <div class="bg-white rounded-md p-10 pt-6 mt-5" style="height: 100%; width: 97vw">
                        <Header />
                        <h1 class="font-bold text-5xl text-gray-800">
                            Welcome back, {this.currentStore.user ? this.currentStore.user.displayName : ""}
                        </h1>
                        <Button
                            handleClick={this.setScanning}
                            classes={`bg-orange-400 text-white ${this.currentStore.isScanning ? "hidden" : ""}`}
                        >
                            {this.currentStore.currentProduct ? "Scan another" : "Scan"}
                        </Button>
                        <div class={`${this.currentStore.isScanning ? "" : "hidden"}`}>
                            <video ref={this.video} path="" height="200" style="height: 400px; width: 100%"></video>
                            <input class="hidden" onInput={this.handleScan} type="file" accept="image/*" capture />
                        </div>
                        {p && p.status === 1 ? <Product info={p} /> : ""}
                        <div class={`${this.currentStore.userMeals ? "" : "hidden"} mt-5`}>
                            <h3 class="text-2xl text-gray-800 font-bold">Here are your recent meals:</h3>
                            <MealsList meals={this.currentStore.userMeals} />
                        </div>
                        <div class={`${this.currentStore.userMeals ? "" : "hidden"} mt-5`}>
                            <h3 class="text-2xl text-gray-800 font-bold">Here is an overview of your intake:</h3>
                            <Graphs meals={this.currentStore.userMeals} />
                        </div>
                    </div>
                </div>
                {this.hasError ? (
                    <div class="error">
                        <button
                            onClick={() => {
                                Sentry.showReportDialog({ eventId: this.eventId })
                            }}
                        >
                            Report feedback
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        )
    }
}
