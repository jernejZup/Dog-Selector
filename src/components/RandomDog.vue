<template>
  <v-container>
    <v-row align="center">
      <v-col align="right">
        <v-btn
          fab
          large
          color="indigo"
          :disabled="
            this.previousRandomDogs[
              this.previousRandomDogs.length - (this.dogHistoryIndex + 1)
            ] === undefined
          "
          @click="previousDog"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="8"
        lg="8"
        xl="8"
        class="order-sm-0 order-md-0 order-lg-0 order-xl-0 order-1"
      >
        <v-img
          :src="dog"
          aspect-ratio="1"
          class="grey lighten-2 rounded-lg ma-3"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col>
        <v-btn fab large color="indigo" @click="nextDog">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RandomDog",
  data() {
    return {
      dog: "",
      dogHistoryIndex: 1,
    };
  },
  computed: {
    ...mapGetters({
      previousRandomDogs: "previousRandomDogs",
    }),
  },
  methods: {
    ...mapActions({
      fetchRandomDogImage: "fetchRandomDogImage",
      addToPreviousDogs: "addToPreviousRandomDog",
    }),
    getNewDog() {
      this.fetchRandomDogImage().then((response) => {
        if (response.data.status === "success") {
          this.dog = response.data.message;
          this.addToPreviousDogs(this.dog);
        }
      });
    },
    nextDog() {
      if (this.dogHistoryIndex <= 1) {
        this.getNewDog();
      } else {
        this.dogHistoryIndex--;
        this.dog =
          this.previousRandomDogs[
            this.previousRandomDogs.length - this.dogHistoryIndex
          ];
      }
    },
    previousDog() {
      this.dogHistoryIndex++;
      this.dog =
        this.previousRandomDogs[
          this.previousRandomDogs.length - this.dogHistoryIndex
        ];
    },
  },
  mounted() {
    this.getNewDog();
  },
};
</script>

<style scoped></style>
