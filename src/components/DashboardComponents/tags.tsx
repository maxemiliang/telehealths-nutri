import { h, RenderableProps, JSX } from "preact"

export default function Tag(props: RenderableProps<{ name: string }>): JSX.Element {
    return (
        <div class="p-1 px-2 m-1 rounded-full bg-orange-400 shadow-md text-xs capitalize">
            {this.props.name.split(":")[1].replace(/-/g, " ")}
        </div>
    )
}
