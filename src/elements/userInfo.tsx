import { h, RenderableProps } from "preact"
import { auth } from "./../firebase"
import { route } from "preact-router"

function logout(): void {
    auth.signOut()
        .then(() => {
            route("/")
        })
        .catch(err => {})
}

export default function UserInfo(props: RenderableProps<{}>) {
    const user = this.context.store.getState().user
    if (user != null)
        return (
            <div class={`flex self-center ${this.props.dark ? "text-gray-800" : "text-white"} font-bold text-xl`}>
                <a href="/user" class="mr-5 hover:text-gray-700">
                    {user.displayName}
                </a>
                |
                <a href="#" onClick={logout} class="mx-5 hover:text-gray-700">
                    Logout
                </a>
                <img class="rounded-full w-10 h-10 object-contain" src={user.photoURL} alt="" />
            </div>
        )
}
