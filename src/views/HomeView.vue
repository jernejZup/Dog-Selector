<template>
  <v-card class="overflow-hidden">
    <!-- APP TOOLBAR -->
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      fade-img-on-scroll
      :src="randomDogImageLink"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-app-bar-title class="title">DOG PICKER</v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs v-model="tab">
          <v-tab v-for="tabName in tabs" :key="tabName">
            {{ tabName }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- APP Container -->
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="100%"
      style="height: 100vh"
    >
      <v-container fluid style="margin-top: 250px">
        <by-breed v-if="tab === 0" />
        <random-dog v-if="tab === 1" />
      </v-container>
    </v-sheet>

    <!-- APP DRAWER -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dog picker</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/about')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import ByBreed from "@/components/ByBreed";
import { mapActions } from "vuex";
import RandomDog from "@/components/RandomDog";

export default {
  name: "Home",
  data() {
    return {
      randomDogImageLink: "",
      drawer: false,
      group: null,
      tab: null,
      tabs: ["By Breed", "Random"],
    };
  },
  components: {
    RandomDog,
    ByBreed,
  },
  methods: {
    ...mapActions({
      fetchRandomDogImage: "fetchRandomDogImage",
    }),
  },
  mounted() {
    this.fetchRandomDogImage().then((response) => {
      this.randomDogImageLink = response.data.message;
    });
  },
};
</script>
