import { projectAuth } from "../firebase/config.js";
import { ref } from "vue";
const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignin = () => {
  return { error, login, isPending };
};

export default useSignin;
