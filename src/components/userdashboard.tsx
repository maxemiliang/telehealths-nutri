import { Component, h } from "preact"
import OpenFoodAPI, { defaultOptions } from "./../off"
import Header from "./DashboardComponents/header"
import Button from "./../elements/button"
import ScannerWrapper from "./DashboardComponents/scannerWrapper"

export default class UserDashboard extends Component {
    public async test(): Promise<any> {
        console.debug(await new OpenFoodAPI(defaultOptions).getProduct(737628064502))
    }

    private testing = null

    public handleScan = data => {
        if (data) {
            console.debug(data)
            this.testing = data
        }
    }
    public handleError = err => {
        console.error(err)
    }

    public render(): JSX.Element {
        return (
            <div class="w-screen h-screen gradient-2 flex justify-center items-center">
                <div class="bg-white rounded-md p-10" style="height: 97vh; width: 97vw">
                    <Header />
                    <Button handleClick={this.test} classes="bg-orange-400 text-white">
                        Test me
                    </Button>
                    <ScannerWrapper></ScannerWrapper>
                </div>
            </div>
        )
    }
}
