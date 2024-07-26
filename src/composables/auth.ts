import { auth } from "@/configs/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { computed, ref } from "vue";
import { useAuth as useVueUseAuth } from "@vueuse/firebase";
import type { UserData } from "@/@types";

const user = ref<UserData>(null);
const isAuthenticated = computed<boolean>(() => !!user.value);


const useAuth = () => {
    async function getUser(): UserData {
        if (user.value) {
            // si l'utilisateur est déjà authentifié
            return user;
        } else {
            // on va cherche à authentifier à travers firebase
            const { user } = await useVueUseAuth(auth);
            return user;
        }
    }

    // Initialisation de l'utilisateur
    async function initUser() {
        user.value = await getUser();
    }

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            user.value = userCredential.user
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Erreur ${errorCode}: ${errorMessage}`);
        }
    };

    const register = async (email: string, password: string) => {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        user.value = userCredentials.user;
    };

    const logout = async () => {
        try {
            await signOut(auth);
            user.value = null;
        } catch (error: any) {
            if (error.message) {
                console.error(error);
            }
        }
    };

    return {
        user,
        isAuthenticated,
        initUser,
        login,
        register,
        logout
    }
};

export { useAuth };