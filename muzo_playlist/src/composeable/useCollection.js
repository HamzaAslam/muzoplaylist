import { ref } from "vue";
import { projectFirestore } from "../firebase/config.js";

const useCollection = (collections) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await projectFirestore.collection(collections).add(doc);
      isPending.value = false;
      console.log(res);
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send message";
      isPending.value = true;
    }
  };
  return { error, addDoc };
};

export default useCollection;
