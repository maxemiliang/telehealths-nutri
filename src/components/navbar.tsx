import { Component, h } from "preact"
import UserInfo from "./../elements/userInfo"

export default class NavBar extends Component {
    public render(): JSX.Element {
        return (
            <nav class="fixed px-12 py-5 w-full">
                <ul class="flex justify-between">
                    <li class="logo">
                        <a href="/">
                            <img class="w-40 h-10 object-cover" src="/assets/logo.png" alt="" />
                        </a>
                    </li>
                    <li class="self-center">
                        {this.context.store.getState().user ? (
                            <UserInfo />
                        ) : (
                            <a
                                class="text-white font-bold text-xl hover:text-gray-700"
                                onClick={this.props.handleClick}
                                href="#"
                            >
                                Login
                            </a>
                        )}
                    </li>
                </ul>
            </nav>
        )
    }
}
