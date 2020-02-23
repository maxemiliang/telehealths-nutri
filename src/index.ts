import App from "./components/app"
import "./styles/tailwind.css"
import * as Sentry from "@sentry/browser"

Sentry.init({
    dsn: "https://e97668d35d1c4c648f10c0cace4cce44@sentry.maxemiliang.cloud/5",
    beforeSend(event, hint) {
        // Check if it is an exception, and if so, show the report dialog
        if (event.exception) {
            Sentry.showReportDialog({ eventId: event.event_id })
        }
        return event
    }
})

export default App
