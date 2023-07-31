<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-detail">
    <!-- playlist info -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownerShip" @click="handleDelete">Delete Playlist</button>
    </div>
    <!-- songs info -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button @click="deleteSong(song.id)">Delete Song</button>
      </div>
      <AddSongs v-if="ownerShip" :sendPlaylist="playlist" />
    </div>
  </div>
</template>
<script>
import AddSongs from "@/components/AddSongs.vue";
import useStorage from "@/composeable/useStorage";
import getDocument from "@/composeable/getDocument";
import getUser from "@/composeable/getUser";
import useDocument from "@/composeable/useDocument";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  components: { AddSongs },
  setup(props) {
    const { error, document: playlist } = getDocument("playlist", props.id);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument("playlist", props.id);
    const { deleteImg } = useStorage();
    const router = useRouter();

    const ownerShip = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImg(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "home" });
    };

    const deleteSong = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id !== id);
      await updateDoc({ songs });
    };
    return { error, playlist, ownerShip, handleDelete, deleteSong };
  },
};
</script>
<style>
.playlist-detail {
  display: grid;
  grid-template-columns: 1fr, 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: left;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
