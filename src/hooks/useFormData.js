import {
    useState
} from "react";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import {
    storage
} from "../firebase-config";

export const useFormData = (initialState, type) => {
    let [formData, setFormData] = useState(initialState);
    let [uploadImage, setUploadImage] = useState(false);

    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const uploadFile = (event) => {
        const storageRef = ref(storage, type + '/' + event.target.files[0].name);

        const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);

        uploadTask.on('state_changed',
            (snapshot) => {
                setUploadImage(true);
            },
            (error) => {

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData((prevValue) => ({
                        ...prevValue,
                        image: downloadURL
                    }))
                    setUploadImage(false)
                });
            }
        );
    }

    return [formData, setFormData, uploadImage, inputChange, uploadFile]
}