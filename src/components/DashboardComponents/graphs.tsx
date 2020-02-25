import { Component, h, RefObject } from "preact"
import { useRef } from "preact/hooks"
import Chart from "chart.js"

export default class Graphs extends Component<{ meals: any }> {
    public config: Record<string, any> = {
        type: "line",
        data: {
            labels: [],
            datasets: []
        }
    }
    public canvas: RefObject<any> = useRef()

    public componentWillMount(): void {
        for (let index = 0; index < 8; index++) {
            this.config.data.labels.push(new Date().setDate(new Date().getDate() - index))
        }
        console.log(this.config.data)
    }

    public componentWillUpdate(): void {}

    public render(): JSX.Element {
        if (!this.props.meals) return
        const meals = this.props.meals.meals
        return (
            <div>
                <canvas ref={this.canvas}></canvas>
            </div>
        )
    }
}
