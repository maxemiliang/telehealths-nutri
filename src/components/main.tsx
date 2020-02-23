import { Component, h, JSX } from "preact"
import { route } from "preact-router"
import { auth, googleAuthProvider } from "./../firebase"
import Swal from "sweetalert2"
import Header from "./header"
import Button from "./../elements/button"
import Section from "./section"
import NavBar from "./navbar"

export default class Main extends Component {
    public scrollDown(): void {
        window.scrollTo({ top: 470, behavior: "smooth" })
    }

    public login(): void {
        if (auth.currentUser) {
            route("/user")
            return
        }
        auth.signInWithPopup(googleAuthProvider)
            .then(function() {
                // The signed-in user info.
                route("/user")
            })
            .catch(function(error) {
                Swal.fire({
                    title: "Error logging in!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Try again"
                })
            })
    }

    public render(): JSX.Element {
        return (
            <div>
                <NavBar handleClick={this.login} />
                <Header>
                    <h1 class="text-3xl font-bold mb-2 text-white">Are you worried about what you eat?</h1>
                    <div class="text-2xl mb-8 text-gray-200">
                        <p>Don't worry, we've got you covered!</p>
                        <p>Because, Yes. We. Scan!</p>
                    </div>
                    <Button classes="mr-2 bg-white text-gray-800" handleClick={this.scrollDown}>
                        Learn more
                    </Button>
                    <Button classes="ml-2 text-white bg-orange-400" handleClick={this.login}>
                        Sign up
                    </Button>
                </Header>
                <Section classes="mt-16 flex-wrap-reverse">
                    <div class="sm:w-6/12 w-full py-10 px-5 flex flex-col justify-center">
                        <h2 class="md:text-5xl text-3xl font-bold mb-5 text-gray-800">Make more healthy choices</h2>
                        <p class="md:text-3xl text-xl text-gray-700">
                            This app will help you choose a healthier diet. It will give you a few recommendations on
                            what to eat so that you can become healthier and stay healthy. <br /> It can also show you
                            how many calories and nutrients each type of food has. Thus it should help you choose what
                            to eat for your next meal.
                        </p>
                    </div>
                    <div class="sm:w-6/12 w-full">
                        <img class="object-cover w-full p-5" src="/assets/food.png" alt="" />
                    </div>
                </Section>
                <Section classes="flex-wrap">
                    <div class="md:w-6/12 w-full">
                        <img class="object-cover w-full md:p-16 p-12" src="/assets/graph.png" alt="" />
                    </div>
                    <div class="md:w-6/12 w-full py-10 px-5 flex-col flex justify-center">
                        <h2 class="md:text-5xl text-3xl font-bold mb-5 text-gray-800">Get insights into your life</h2>
                        <p class="md:text-3xl text-xl text-gray-700">
                            Our statistical view helps you track all the different information that you need to track.
                            For example it will help you track your calorie intake by showing it the products you have
                            consumed or are about to consume. <br /> But it doesn't just track your calories, it can
                            also track the amount of carbohydrates, proteins, fats, vitamins and macro- / micronutrients
                            you have consumed, just by showing it the products!
                        </p>
                    </div>
                </Section>
                <Section classes="gradient-1 mb-0">
                    <div class="w-full py-12">
                        <div class="m-auto w-auto text-center">
                            <h2 class="text-5xl font-bold mb-5 text-gray-800">What are you wating for?</h2>
                            <Button handleClick={this.login} classes="bg-orange-400 text-white self-center">
                                Sign Up Today!
                            </Button>
                        </div>
                    </div>
                </Section>
            </div>
        )
    }
}
