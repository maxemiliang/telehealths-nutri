import { h, RenderableProps, JSX } from "preact"

export default function Nutrients(
    props: RenderableProps<{ nutriments: any[]; weight: string; per_data }>
): JSX.Element {
    const n = this.props.nutriments
    return (
        <div class="m-1 md:ml-0 ml-1 flex flex-wrap flex-col text-l">
            <h3 class="text-lg">Nutritional values:</h3>
            <p class="text-xs">
                Weight: {this.props.weight} / Nutrition data per: {this.props.per_data}
            </p>
            <p>
                Energy: {n["energy-kcal_value"]} {n["energy-kcal_unit"]}
            </p>
            <p>
                Fat: {n.fat}
                {n.fat_unit}
            </p>
            <p>
                Protein: {n.proteins}
                {n.proteins_unit}
            </p>
        </div>
    )
}
