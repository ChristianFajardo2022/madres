import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";

import { firestore } from "../firebase/firebase-config"; // Asegúrate de importar la configuración de Firebase adecuadamente

const db = getFirestore();

export const fetchStockData = async (setStock) => {
  const stockDocRef = doc(firestore, "stock", "stock_osos"); // Suponiendo que el ID del documento es "stock"
  const docSnap = await getDoc(stockDocRef);
  if (docSnap.exists()) {
    setStock(docSnap.data());
  } else {
    console.log("No hay datos en el documento 'stock'.");
  }
};
export const restarStock = async () => {
  try {
    const stockDocRef = doc(firestore, "stock", "stock_osos"); // Ajusta el ID del documento según sea necesario
    const docSnap = await getDoc(stockDocRef);

    if (docSnap.exists()) {
      const currentStock = docSnap.data().stock;
      await updateDoc(stockDocRef, {
        stock: currentStock - 1,
      });
      console.log(
        "Stock actualizado exitosamente. Nuevo valor: ",
        currentStock - 1
      );
    } else {
      console.log("Documento no encontrado.");
    }
  } catch (error) {
    console.error("Error al restar el stock:", error);
  }
};

export const updateFirebaseStockStatus = async (customerId, newStatus) => {
  const db = getFirestore();
  const usersRef = collection(db, "usuarios"); // Asegúrate de que 'usuarios' es el nombre correcto de la colección
  const q = query(usersRef, where("customer_id", "==", customerId));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    querySnapshot.forEach((doc) => {
      const userRef = doc.ref;
      updateDoc(userRef, {
        stockUpdated: newStatus,
      })
        .then(() => {
          console.log("Firebase stock status updated successfully.");
        })
        .catch((error) => {
          console.error("Failed to update Firebase stock status:", error);
        });
    });
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};
