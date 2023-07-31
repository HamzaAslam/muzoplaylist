<template>
  <div class="user-playlist"></div>
  <h2>My Playlist</h2>
  <div v-if="playlists">
    <ListView :playlist="playlists" />
  </div>
  <router-link class="btn" :to="{ name: 'CreatePlaylist' }"
    >Create your playlist</router-link
  >
</template>
<script>
import ListView from "@/components/ListView.vue";
import getCollection from "@/composeable/getCollection";
import getUser from "@/composeable/getUser";
export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlist", [
      "userId",
      "==",
      user.value.uid,
    ]);
    console.log(playlists);
    return { playlists };
  },
};
</script>
<style></style>
