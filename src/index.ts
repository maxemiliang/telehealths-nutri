import App from "./components/app"
import "./styles/tailwind.css"
import * as Sentry from "@sentry/browser"

Sentry.init({
    dsn: "https://e97668d35d1c4c648f10c0cace4cce44@sentry.maxemiliang.cloud/5"
})

export default App
