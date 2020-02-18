import { h, RenderableProps, JSX } from "preact"

export default function Button(props: RenderableProps<{ handleClick?: JSX.MouseEventHandler<any>; classes?: string }>) {
    return (
        <button
            onClick={this.props.handleClick ? this.props.handleClick : null}
            class={`font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider ${
                this.props.classes ? this.props.classes : ""
            }`}
        >
            {this.props.children}
        </button>
    )
}
