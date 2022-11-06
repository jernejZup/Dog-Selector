<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <template >
          <v-data-table
              :headers="headers"
              :items="mainBreeds"
              hide-default-footer
              class="elevation-1"
              disable-pagination
              height="300"
              :loading="mainBreeds.length === 0"
              fixed-header
              @click:row="useBreed"
              :mobile-breakpoint="0"
          >
            <template v-slot:item.breed="{ item }">
              {{item.breed}}
              <v-icon
                  v-if="item.subBreeds.length > 0"
              >mdi-chevron-right</v-icon>
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-col v-if="subBreeds.length>0">
        <template >
          <v-data-table
              :headers="subBreedHeaders"
              :items="subBreeds"
              hide-default-footer
              class="elevation-1"
              disable-pagination
              height="300"
              :loading="mainBreeds.length === 0"
              fixed-header
              @click:row="useSubBreed"
              :mobile-breakpoint="0"
          >
            <template v-slot:item.breed="{ item }">
              {{item.breed}}
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data () {
    return {
      subBreeds:[],
      headers: [
        {
          text: 'Dog Breed',
          align: 'start',
          sortable: false,
          value: 'breed',
        },
      ],
      subBreedHeaders: [
        {
          text: 'Optional sub Breed',
          align: 'start',
          sortable: false,
          value: 'breed',
        },
      ]
    }
  },
  methods: {
    ...mapActions({
      fetchBreeds: 'fetchBreeds',
      setSelectedBreed: "setSelectedBreed"
    }),
    useBreed(item, row) {
      this.setSelectedBreed(item.breed)
      this.subBreeds = item.subBreeds.map(item => ({ breed: item }));
    },
    useSubBreed(item, row) {
      if(this.selectedBreed.includes('/')){
        this.setSelectedBreed(this.selectedBreed.split('/')[0] + '/' + item.breed)
      }else {
        this.setSelectedBreed(this.selectedBreed + '/' + item.breed)
      }
    }
  },
  mounted () {
    this.fetchBreeds()
  },
  computed: {
    ...mapGetters({
      breeds: 'breeds',
      selectedBreed: 'selectedBreed'
    }),
    mainBreeds() {
      return Object.keys(this.breeds).map(item => ({ breed: item, subBreeds: this.breeds[item] || [] }));
    },
  },
}
</script>

<style scoped lang="scss">

</style>
