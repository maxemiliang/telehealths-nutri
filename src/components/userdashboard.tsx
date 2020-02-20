import { Component, h } from "preact"
import OpenFoodAPI, { defaultOptions } from "./../off"
import Header from "./DashboardComponents/header"
import Button from "./../elements/button"

export default class UserDashboard extends Component {
    public currentProduct = null

    public handleScan(e): void {
        console.log(e.target.files)
    }

    public render(): JSX.Element {
        return (
            <div class="w-screen h-screen gradient-2 flex justify-center items-center">
                <div class="bg-white rounded-md p-10" style="height: 97vh; width: 97vw">
                    <Header />
                    <input value={this.currentProduct} onInput={this.handleScan} type="file" accept="image/*" capture />
                </div>
            </div>
        )
    }
}
