import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/firebaseConfig";

const COLLECTION_NAME = 'posts'

export const createPost = (post) => {
    return addDoc(collection(db, COLLECTION_NAME), post)
};


export const getAllPosts = async () => {
    const q = collection(db, COLLECTION_NAME);
    const snapShot = await getDocs(q);
    const posts = snapShot.docs.map(doc => doc.data())
    return posts;

}

export const getPostById = async (id) => {
    console.log(id)
    const q = doc(db, COLLECTION_NAME, id);
    const post = await getDoc(q);
    if (post.exists) {
        return {
            id: post.id,
            post: {
                ...post.data
            }
        }
    } else {
        console.log('no such document found')
    }


}
