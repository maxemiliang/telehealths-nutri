import { h, RenderableProps } from "preact"
import { auth } from "./../firebase"
import { route } from "preact-router"
import { useSelector } from "@preact-hooks/unistore"
import { AppState } from "../store"

function logout(): void {
    auth.signOut()
        .then(() => {
            route("/")
        })
        .catch(err => {})
}

export default function UserInfo(props: RenderableProps<{ dark?: boolean; showName?: boolean }>): JSX.Element {
    const user = useSelector("user").user
    console.log(user)
    if (user != null)
        return (
            <div
                class={`flex md:flex-inital justify-end items-center flex-auto self-center ${
                    this.props.dark ? "text-gray-800" : "text-white"
                } font-bold md:text-xl`}
            >
                <a href="/user" class={`md:mr-5 mr-2 hover:text-gray-700 ${this.props.showName ? "" : "hidden"}`}>
                    {user ? user.displayName : ""}
                </a>
                {this.props.showName ? "|" : ""}
                <a href="#" onClick={logout} class={`md:mx-5 mx-2 hover:text-gray-700`}>
                    Logout
                </a>
                <img class="rounded-full w-10 h-10 object-contain" src={user ? user.photoURL : ""} alt="" />
            </div>
        )
}
