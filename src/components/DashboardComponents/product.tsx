import { Component, h } from "preact"
import Tag from "./tags"
import Nutrients from "./nutrients"
import Button from "./../../elements/button"
import { useStore } from "@preact-hooks/unistore"
import StatusAlert, { StatusAlertService } from "preact-status-alert"
import { Store } from "unistore"
import { AppState } from "../../store"

export default class Product extends Component<{ info: any }> {
    public currentMeal: any
    public store: Store<AppState> = useStore()
    public handleMeal(e): void {
        if (e.target.value > Number(e.target.max)) e.target.value = e.target.max
        if (e.target.value < Number(e.target.min)) e.target.value = e.target.min
        this.store.setState({ tempValue: e.target.value })
    }

    public handleSave(): void {
        if (
            !isNaN(this.props.info.product.quantity.split(" ")[0]) &&
            !isNaN(this.store.getState().tempValue) &&
            this.store.getState().tempValue <= Number(this.props.info.product.quantity.split(" ")[0])
        )
            this.store.setState({ savedMeal: this.store.getState().tempValue })
        else StatusAlertService.showError("Error with input")
    }

    public handleClose(): void {
        this.store.setState({ currentProduct: null })
    }

    public render(): JSX.Element {
        const product = this.props.info.product
        return (
            <div>
                <StatusAlert />
                <div class="m-5 mx-0 shadow-xl bg-gray-100 border-2 border-solid rounded-md grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="grid grid-cols-2 gap-2 p-5">
                        <img class="w-full object-contain h-64 rounded-lg" src={product.image_front_url} alt="" />
                        <img class="w-full object-contain h-64 rounded-lg" src={product.image_nutrition_url} alt="" />
                    </div>
                    <div className="info text-base md:py-5 md:px-0 px-1">
                        <h2 class="text-2xl text-gray-800 font-bold">
                            {product.product_name
                                ? product.product_name
                                : product.product_name_de
                                ? product.product_name_de
                                : product.product_name_fr
                                ? product.product_name_fr
                                : "Name not found"}{" "}
                        </h2>
                        <Nutrients
                            nutriments={product.nutriments}
                            weight={product.quantity}
                            per_data={product.nutrition_data_per}
                        />
                        <div class="flex flex-wrap">
                            <h3 class="text-xs self-center">Tags:</h3>
                            {product.nutrient_levels_tags.map(nutrient => {
                                return <Tag name={nutrient} />
                            })}
                        </div>
                    </div>
                    <div className="col-span-2 text-center text-2xl text-gray-800 font-bold px-5 pb-5">
                        <h2>Save meal</h2>
                        <p class="text-sm font-normal mb-4">Insert how much you consumed</p>
                        <input
                            value={this.store.getState().tempValue}
                            onChange={this.handleMeal.bind(this)}
                            class="bg-white border-solid border-2 rounded-md px-2 py-1"
                            type="number"
                            min={1}
                            max={
                                this.props.info.product.quantity ? this.props.info.product.quantity.split(" ")[0] : 1000
                            }
                            placeholder="5"
                        />{" "}
                        {product.quantity.split(" ")[1]}
                        <br />
                        <Button handleClick={this.handleSave.bind(this)} classes="bg-green-500 text-white mt-4">
                            Save
                        </Button>
                        <Button handleClick={this.handleClose.bind(this)} classes="bg-red-500 text-white ml-5">
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
