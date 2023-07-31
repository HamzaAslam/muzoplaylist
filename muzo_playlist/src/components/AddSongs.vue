<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Show Form</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add New Song</h4>
      <input type="text " placeholder="Song Title" required v-model="title" />
      <input type="text " placeholder="Artist " v-model="artist" />
      <button>Add Song</button>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import useDocument from "@/composeable/useDocument.js";

export default {
  props: ["sendPlaylist"],
  setup(props) {
    const title = ref(null);
    const artist = ref(null);
    const showForm = ref(false);
    const { updateDoc } = useDocument("playlist", props.sendPlaylist.id);

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 10000),
      };

      await updateDoc({
        songs: [...props.sendPlaylist.songs, newSong],
      });
      title.value = "";
      artist.value = "";
    };

    return { title, artist, showForm, handleSubmit };
  },
};
</script>
<style scoped>
.add-song {
  text-align: center;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
