import { Component, h } from "preact"
import { Store } from "unistore"
import { AppState } from "../../store"

export default class MealsList extends Component<{ meals: any }> {
    public render(): JSX.Element {
        if (!this.props.meals) return
        const meals = this.props.meals.meals.reverse().slice(0, 5)
        return (
            <div class="flex flex-wrap p-5 flex-col">
                {meals.map(meals => {
                    return (
                        <div class="flex">
                            <p class="pr-1">You ate: {meals.product.name},</p>
                            <p class="pr-1">
                                Amount: {meals.mealSize} {meals.product.weight.split(" ")[1]}
                            </p>
                            <p>On the: {new Date(meals.time).toLocaleDateString()}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
