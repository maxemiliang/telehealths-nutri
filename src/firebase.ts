import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB6upPbnFTK5i9Pn33tXTad9yztf05juqk",
    authDomain: "telehealth-2a8e4.firebaseapp.com",
    databaseURL: "https://telehealth-2a8e4.firebaseio.com",
    projectId: "telehealth-2a8e4",
    storageBucket: "telehealth-2a8e4.appspot.com",
    messagingSenderId: "664949477340",
    appId: "1:664949477340:web:4bf77788f9c45bbf62c919",
    measurementId: "G-VN7QETBF3T"
}

firebase.initializeApp(firebaseConfig)

export default firebase

export const database = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export function getCurrentUser(auth): Promise<any> {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe()
            resolve(user)
        }, reject)
    })
}
