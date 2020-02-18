import { Component, h } from "preact"
import UserInfo from "./../../elements/userInfo"

export default class Header extends Component {
    public render(): JSX.Element {
        return (
            <div class="w-full flex flex-auto justify-between">
                <img class="md:w-40 w-24 h-16 object-cover" style="filter: invert(1);" src="/assets/logo.png" alt="" />
                <UserInfo dark={true} />
            </div>
        )
    }
}
