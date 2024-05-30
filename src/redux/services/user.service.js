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

export const getUserFromFirebase = async () => {
    const q = query(collection(db, "users"));
    let users = [];


    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        let user = doc.data();
        user.id = doc.id;
        users.push(user);
    });

    return users;
}

export const addUserToFirebase = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const deleteUserToFirebase = async (user) => {
    try {
        await deleteDoc(doc(db, "users", user.id));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export const updateUserToFirebase = async (user) => {
    try {
        await updateDoc(doc(db, "users", user.id), user);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}