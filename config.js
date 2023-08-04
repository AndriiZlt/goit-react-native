// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBqnJaoU1QShEkZ4SerJdq52AcBsFCDeBI",
    authDomain: "react-native-43db4.firebaseapp.com",
    projectId: "react-native-43db4",
    storageBucket: "react-native-43db4.appspot.com",
    messagingSenderId: "819883224841",
    appId: "1:819883224841:web:6cd77619cf1548adf62dd8",
    measurementId: "G-WGJZE77N5R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);