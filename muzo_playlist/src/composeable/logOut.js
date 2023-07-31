import { projectAuth } from "../firebase/config.js";
import { ref } from "vue";
const error = ref(null);
const isPending = ref(false);

const logout = async () => {
  error.value = null;
  isPending.value = true;
  try {
    await projectAuth.signOut();
    isPending.value = false;
  } catch (err) {
    console.log(err.message);
    err.value = err.message;
    isPending.value = false;
  }
};

const useLogout = () => {
  return { error, logout };
};

export default useLogout;
