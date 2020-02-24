import { Component, h } from "preact"
import { StoreProvider } from "@preact-hooks/unistore"
import { store } from "../store"
import { auth, getCurrentUser } from "../firebase"
import Router, { route } from "preact-router"
import Main from "./main"
import UserDashboard from "./userdashboard"
import * as Sentry from "@sentry/browser"
import { StoreComponent } from "./store"

export default class App extends Component {
    public componentDidMount(): void {
        auth.onAuthStateChanged(user => {
            if (user !== null) Sentry.setUser({ id: user.uid })
            store.setState({ user: user })
            console.log(store.getState())
            this.forceUpdate()
        })
    }

    public handleRoute = async (e): Promise<void> => {
        const currentUser = await getCurrentUser(auth)
        switch (e.url) {
            case "/user":
                if (!currentUser) route("/", true)
                break
        }
    }
    public render(): JSX.Element {
        return (
            <StoreComponent>
                <Router onChange={this.handleRoute}>
                    <Main path="/" />
                    <UserDashboard path="/user" />
                </Router>
            </StoreComponent>
        )
    }
}
