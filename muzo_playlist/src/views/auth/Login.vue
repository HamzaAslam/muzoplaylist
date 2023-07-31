<template>
  <div>
    <form @submit.prevent="handleSignIn">
      <h2>Login</h2>
      <input type="email" placeholder="Email " v-model="email" />
      <input type="password" placeholder="Password " v-model="password" />

      <button v-if="!isPending">Log in</button>
      <button v-if="isPending" disabled>Loading ...</button>

      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>
<script>
import signIn from "@/composeable/signIn.js";
import { ref } from "vue";
export default {
  setup() {
    const { login, error, isPending } = signIn();
    const email = ref(null);
    const password = ref(null);

    const handleSignIn = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("user loged in");
      }
    };

    return { email, password, handleSignIn, error, isPending };
  },
};
</script>
<style></style>
