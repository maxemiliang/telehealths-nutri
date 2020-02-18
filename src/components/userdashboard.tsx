import { Component, h } from "preact"
import Header from "./DashboardComponents/header"

export default class UserDashboard extends Component {
    public render(): JSX.Element {
        return (
            <div class="w-screen h-screen gradient-2 flex justify-center items-center">
                <div class="bg-white rounded-md p-10" style="height: 97vh; width: 97vw">
                    <Header handleClick={this.logout} />
                </div>
            </div>
        )
    }
}
