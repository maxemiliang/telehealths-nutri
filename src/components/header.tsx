import { Component, h } from "preact"

export default class Header extends Component {
    private handleClick(): void {}

    public render(): JSX.Element {
        return (
            <div class="py-32 gradient-2">
                <div class="container mx-auto px-6">{this.props.children}</div>
            </div>
        )
    }
}
