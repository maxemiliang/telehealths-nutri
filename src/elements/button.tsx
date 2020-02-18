import { h, RenderableProps } from "preact"

export default function Button(props: RenderableProps<{}>) {
    return (
        <button
            onClick={this.props.handleClick}
            class={`font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider ${
                this.props.classes ? this.props.classes : ""
            }`}
        >
            {this.props.children}
        </button>
    )
}
