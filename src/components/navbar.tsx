import { Component, h, JSX } from "preact"
import UserInfo from "./../elements/userInfo"
import { useSelector } from "@preact-hooks/unistore"
import { AppState } from "../store"

export default class NavBar extends Component<{ handleClick: JSX.MouseEventHandler<any> }> {
    public render(): JSX.Element {
        const user = useSelector<AppState, any>("user").user
        return (
            <nav class="fixed md:px-12 px-5 py-5 w-full">
                <ul class="flex justify-between">
                    <li class="logo">
                        <a href="/">
                            <img class="w-40 h-10 object-cover" src="/assets/logo.png" alt="" />
                        </a>
                    </li>
                    <li class="self-center">
                        {user ? (
                            <UserInfo showName={true} />
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
