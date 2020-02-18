import { Component, h } from "preact"
import { Provider } from "unistore/preact"
import { store } from "./../store"
import { auth, getCurrentUser } from "./../firebase"
import Router, { route } from "preact-router"
import Main from "./main"
import UserDashboard from "./userdashboard"

export default class App extends Component {
    public componentDidMount(): void {
        auth.onAuthStateChanged(user => {
            store.setState({ user: user })
            this.forceUpdate()
        })
    }

    public handleRoute = async e => {
        switch (e.url) {
            case "/user":
                const currentUser = await getCurrentUser(auth)
                if (!currentUser) route("/", true)
                break
        }
    }

    public render(): JSX.Element {
        return (
            <Provider store={store}>
                <Router onChange={this.handleRoute}>
                    <Main path="/" />
                    <UserDashboard path="/user" />
                </Router>
            </Provider>
        )
    }
}
