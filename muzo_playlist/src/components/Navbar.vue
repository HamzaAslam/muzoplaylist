<template>
  <div class="navbar">
    <nav>
      <h1><router-link :to="{ name: 'home' }">Muzo Playlist</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }"
            >Create Playlist</router-link
          >
          <router-link :to="{ name: 'Myplaylist' }">My Playlist </router-link>
          <span>Hey {{ user.displayName }}</span>
          <button class="btn" @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Signup' }" class="btn"
            >Sign Up</router-link
          >
          <router-link :to="{ name: 'Login' }" class="btn">Sign In</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import useLogout from "@/composeable/logOut.js";
import getUser from "@/composeable/getUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, logout } = useLogout();
    const router = useRouter();
    const { user } = getUser();
    const handleLogout = async () => {
      await logout();
      console.log("User is logged out");
      router.push({ name: "Login" });
    };
    return { handleLogout, error, user };
  },
};
</script>
<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>
