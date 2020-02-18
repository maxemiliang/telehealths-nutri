import { Component, h } from "preact"

export default class Section extends Component<{ classes?: string }> {
    public render(): JSX.Element {
        return (
            <section class={`m-auto px-12 my-10 flex flex-auto ${this.props.classes ? this.props.classes : ""}`}>
                {this.props.children}
            </section>
        )
    }
}
