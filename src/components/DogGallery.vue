<template>
  <div v-if="dogs.length>0">
    <v-row>
      <v-col
          v-for="dog in dogs[page]"
          :key="dog"
          cols="12"
          sm="6"
          md="4"
          lg="2"
          xl="2"
      >
        <v-img
            :src="dog"
            aspect-ratio="1"
            class="grey lighten-2 rounded-lg ma-3"
        >
          <template v-slot:placeholder>
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
              <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <div>
      <div class="text-center">
        <v-btn
            class="mx-2"
            fab
            color="indigo"
            :disabled="page === 0"
            @click="page--"
        >
          <v-icon dark>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
            class="mx-2"
            fab
            color="indigo"
            :disabled="dogs[page + 1] === undefined"
            @click="page++"
        >
          <v-icon dark>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "DogGallery",
  data() {
    return {
      page:0,
    };
  },
  computed: {
    ...mapGetters({
      dogs: "dogs",
    })
  },
  watch: {
    dogs() {
      this.page = 0;
    }
  }
}
</script>

<style scoped>

</style>