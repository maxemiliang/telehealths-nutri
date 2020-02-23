import { Component, h, Ref, RefObject } from "preact"
import { useRef } from "preact/hooks"
import OpenFoodAPI, { defaultOptions } from "./../off"
import Header from "./DashboardComponents/header"
import Button from "./../elements/button"
import { BrowserBarcodeReader, Exception } from "@zxing/library"
export default class UserDashboard extends Component {
    public video: RefObject<HTMLVideoElement> = useRef()
    public user: any
    public isScanning: boolean

    public handleScan(e): void {
        const files: FileList = e.target.files
        if (files.length > 0) {
            const reader = new FileReader()
            const file: File = e.target.files[0]
            const codeReader = new BrowserBarcodeReader()

            reader.onload = async (): Promise<void> => {
                const fileData: string | ArrayBuffer = reader.result
                try {
                    const result = await codeReader.decodeFromImageUrl(fileData.toString())
                    console.log(result)
                } catch (err) {
                    console.error(err)
                }
            }

            reader.readAsDataURL(file)
        }
    }

    public componentDidMount(): void {
        this.isScanning = false
        this.user = this.context.store.getState().user
        console.log(this.user)
    }

    public componentDidUpdate(): void {
        if (this.isScanning) this.setupScanner()
    }

    public async setupScanner(): Promise<void> {
        const codeReader = new BrowserBarcodeReader()
        try {
            const result = await codeReader.decodeFromInputVideoDevice(undefined, this.video.current)
            console.log(result)
        } catch (err) {
            console.error(err)
        }
    }

    public render(): JSX.Element {
        return (
            <div class="w-screen h-screen gradient-2 flex justify-center items-center">
                <div class="bg-white rounded-md p-10 pt-6" style="height: 97vh; width: 97vw">
                    <Header />
                    <h1 class="font-bold text-2xl">Welcome {this.user ? this.user.displayName : ""}</h1>
                    <div style={`display: ${this.isScanning ? "block" : "none"};`}>
                        <video ref={this.video} path="" width="300" height="200" style="border: 1px solid gray"></video>
                        <input onInput={this.handleScan} type="file" accept="image/*" capture />
                    </div>
                </div>
            </div>
        )
    }
}
