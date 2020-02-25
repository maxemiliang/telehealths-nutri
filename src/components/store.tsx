import { RenderableProps, h } from "preact"
import { StoreProvider } from "@preact-hooks/unistore"
import { store } from "../store"

export function StoreComponent(props: RenderableProps<any>): JSX.Element {
    return <StoreProvider value={store} children={this.props.children}></StoreProvider>
}
