import { auth } from '../lib/firebaseInit'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';

export async function createUser(email, password) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
        
    return user;
}

export function getCurrentUser() {
    return auth.currentUser;
}

export async function singInUser(email, password) {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
}

export async function sendEmail() {
    const user = auth.currentUser;

    await sendEmailVerification(user);
}

export async function signOut() {
    await auth.signOut();
}