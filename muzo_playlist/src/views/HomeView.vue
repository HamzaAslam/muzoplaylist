<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch data</div>
    <div v-if="documents">
      <!-- <div v-for="doc in documents" :key="doc.id"></div> -->
      <ListView :playlist="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from "@/composeable/getCollection";
import ListView from "../components/ListView.vue";
export default {
  name: "HomeView",
  component: { ListView },
  setup() {
    const { error, documents } = getCollection("playlist");
    return { error, documents };
  },
  components: { ListView },
};
</script>
