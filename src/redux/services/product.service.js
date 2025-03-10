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

export const getProductFromFirebase = async () => {
    const q = query(collection(db, "products"));
    let products = [];


    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let product = doc.data();
        product.id = doc.id;
        products.push(product);
    });

    return products;
}

export const addProductToFirebase = async (product) => {
    try {
        const docRef = await addDoc(collection(db, "products"), product);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const deleteProductToFirebase = async (product) => {
    try {
        await deleteDoc(doc(db, "products", product.id));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export const updateProductToFirebase = async (product) => {
    try {
        await updateDoc(doc(db, "products", product.id), product);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}