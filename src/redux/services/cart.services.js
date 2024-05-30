import {
    collection,
    addDoc,
    query,
    doc,
    getDocs,
    deleteDoc,
    updateDoc
} from "firebase/firestore";
import {
    db
} from "../../firebase-config";
import { defaultValue } from "../reducers/cart.reducer";

export const getCartFromFirebase = async () => {
    const q = query(collection(db, "cart"));
    let cart = defaultValue;

    const querySnapshot = await getDocs(q);

    let currentCartId = localStorage.getItem("current_cart_id");
        
    querySnapshot.forEach((doc) => {
        let user = doc.data();
        user.id = doc.id;

        if(currentCartId === doc.id) {
            cart = doc.data();
        }
    });

    return cart;
}

export const addCartToFirebase = async (cart) => {
    try {
        let currentCartId = localStorage.getItem("current_cart_id");

        if(currentCartId) {
            await updateDoc(doc(db, "cart", currentCartId), cart);
        }else {
            const docRef = await addDoc(collection(db, "cart"), cart);
            localStorage.setItem("current_cart_id", docRef.id);
            console.log("Document written with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
