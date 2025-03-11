import { initializeApp } from "./firebase";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Configuration Firebase (REMPLACE CES INFOS PAR LES TIENNES)
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Exporter les fonctions Firestore pour gérer les cours
export const CourseService = {
  // Ajouter un cours
  addCourse: async (courseData: { title: string; description: string; content: string }) => {
    try {
      const docRef = await addDoc(collection(db, "courses"), courseData);
      return { id: docRef.id, ...courseData };
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours :", error);
      throw error;
    }
  },

  // Récupérer tous les cours
  getCourses: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
      throw error;
    }
  },

  // Mettre à jour un cours
  updateCourse: async (id: string, updatedData: { title?: string; description?: string; content?: string }) => {
    try {
      const courseRef = doc(db, "courses", id);
      await updateDoc(courseRef, updatedData);
      return { id, ...updatedData };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du cours :", error);
      throw error;
    }
  },

  // Supprimer un cours
  deleteCourse: async (id: string) => {
    try {
      const courseRef = doc(db, "courses", id);
      await deleteDoc(courseRef);
      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression du cours :", error);
      throw error;
    }
  }
};
