import { db, auth, getCurrentUser } from "./firebase"
import firebase, { firestore } from "firebase"

export async function syncMeal(product: Record<string, any>, mealSize: number): Promise<void> {
    const user = await getCurrentUser(auth)
    if (user) {
        let productName = product.product.product_name
            ? product.product.product_name
            : product.product.product_name_de
            ? product.product.product_name_de
            : product.product.product_name_fr
            ? product.product.product_name_fr
            : "name_not_found"
        const currentTime = new Date().toUTCString()
        db.collection("user_data")
            .where("userId", "==", user.uid)
            .get()
            .then(snapshot => {
                let data: Record<string, any> = {
                    time: currentTime,
                    mealSize: mealSize,
                    product: {
                        name: productName,
                        code: product.code,
                        nutriments: product.product.nutriments,
                        weight: product.product.quantity,
                        nutritionSize: product.product.nutrition_data_per
                    }
                }
                if (snapshot.empty) {
                    let newData: Record<string, any> = {
                        userId: user.uid,
                        meals: [data]
                    }
                    db.collection("user_data").add(newData)
                } else {
                    snapshot.forEach(doc => {
                        doc.ref.update({ meals: firebase.firestore.FieldValue.arrayUnion(data) })
                    })
                }
            })
    }
}
