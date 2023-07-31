import { ref, watchEffect } from "vue";
import { projectFirestore } from "@/firebase/config";

const getCollection = (collection, query) => {
  const documents = ref(null);
  const error = ref(null);
  //firestore collection refernce using param "collection"
  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  if (query) {
    collectionRef = collectionRef.where(...query);
  }

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        //creating timestamp & sending back to server
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      // update calues
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;

      error.value = "Could not fetch data";
    }
  );
  watchEffect((oninvalidate) => {
    oninvalidate(() => unsub());
  });
  return { error, documents };
};
export default getCollection;
