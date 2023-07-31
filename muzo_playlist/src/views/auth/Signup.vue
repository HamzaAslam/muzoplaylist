<template>
  <div>
    <form @submit.prevent="handleSignUp">
      <h2>Sign Up</h2>
      <input type="text" placeholder="User Name " v-model="displayName" />
      <input type="email" placeholder="Email " v-model="email" />
      <input type="password" placeholder="Password " v-model="password" />

      <button v-if="!isPending">Sign Up</button>
      <button v-if="isPending" disabled>Loading ...</button>

      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>
<script>
import signUp from "@/composeable/signUp.js";
import { ref } from "vue";
export default {
  setup() {
    const { error, signup, isPending } = signUp();
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSignUp = async () => {
      const res = signup(email.value, password.value, displayName.value);
      if (!error.value) {
        console.log("user signed up");
      }
    };

    return { displayName, email, password, error, handleSignUp, isPending };
  },
};
</script>
<style></style>
