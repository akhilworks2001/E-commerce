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

export const getCategoryFromFirebase = async () => {
    const q = query(collection(db, "categories"));
    let categories = [];


    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let category = doc.data();
        category.id = doc.id;
        categories.push(category);
    });

    return categories;
}

export const addCategoryToFirebase = async (category) => {
    try {
        const docRef = await addDoc(collection(db, "categories"), category);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const deleteCategoryToFirebase = async (category) => {
    try {
        await deleteDoc(doc(db, "categories", category.id));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export const updateCategoryToFirebase = async (category) => {
    try {
        await updateDoc(doc(db, "categories", category.id), category);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}