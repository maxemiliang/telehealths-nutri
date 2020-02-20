import { Component, h, Ref, createRef } from "preact"
import OpenFoodAPI, { defaultOptions } from "./../off"
import Header from "./DashboardComponents/header"
import Button from "./../elements/button"
import { BrowserBarcodeReader } from "@zxing/library"
export default class UserDashboard extends Component<{ video: Ref<HTMLVideoElement> }> {
    public video = createRef()

    public handleScan(e): void {
        const files: FileList = e.target.files
        if (files.length > 0) {
            const reader = new FileReader()
            const file: File = e.target.files[0]
            const codeReader = new BrowserBarcodeReader()

            reader.onload = async (): Promise<void> => {
                const fileData: string | ArrayBuffer = reader.result
                try {
                    await codeReader.decodeFromInputVideoDevice(undefined, this.video.current).then(result => {
                        console.log(result)
                    })
                } catch (err) {
                    console.error(err)
                }
            }

            reader.readAsDataURL(file)
        }
    }

    public render(): JSX.Element {
        return (
            <div class="w-screen h-screen gradient-2 flex justify-center items-center">
                <div class="bg-white rounded-md p-10" style="height: 97vh; width: 97vw">
                    <Header />
                    <video ref={this.video} width="300" height="200" style="border: 1px solid gray"></video>
                    <input onInput={this.handleScan} type="file" accept="image/*" capture />
                </div>
            </div>
        )
    }
}
