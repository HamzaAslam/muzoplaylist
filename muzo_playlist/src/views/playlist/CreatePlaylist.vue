<template>
  <form @submit.prevent="handlePlaylist">
    <h3>Create playlist</h3>
    <input type="text" placeholder="Playlist Title" required v-model="title" />
    <textarea
      v-model="description"
      required
      placeholder="Playlist description"
    ></textarea>
    <label>Upload Playlist Cover</label>
    <input type="file" @change="handleFile" />
    <p v-if="fileError" class="error">{{ fileError }}</p>
    <button v-if="!isPending">Create Playlist</button>
    <button v-else="isPending" disabled>Saving...</button>
  </form>
</template>
<script>
import { ref } from "vue";
import useStorage from "@/composeable/useStorage.js";
import useCollection from "@/composeable/useCollection";
import { timeStamp } from "@/firebase/config";
import getUser from "@/composeable/getUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlist");
    const { user } = getUser();
    const isPending = ref(false);
    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const file = ref("");
    const fileError = ref("");

    const handlePlaylist = async () => {
      isPending.value = true;
      if (file.value) {
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timeStamp(),
        });
        isPending.value = false;

        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      }
    };
    //types of files
    const types = ["image/jpeg", "image/png"];
    const handleFile = (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select image file(PNG, JPEG)";
      }
    };

    return {
      title,
      description,
      handleFile,
      fileError,
      handlePlaylist,
      isPending,
    };
  },
};
</script>
<style>
input[type="file"] {
  border: 0;
  padding: 0;
}

label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
