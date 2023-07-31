import { ref, watchEffect } from "vue";
import { projectFirestore } from "@/firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);
  //firestore collection refernce using param "collection"
  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot((doc) => {
    if (doc.data()) {
      document.value = { ...doc.data(), id: doc.id };
      error.value = null;
    } else {
      error.value = "Document does not exist";
      (err) => {
        console.log(err.message);
        error.value = "Could not fetch document";
      };
    }
  });
  watchEffect((oninvalidate) => {
    oninvalidate(() => unsub());
  });
  return { error, document };
};
export default getDocument;
