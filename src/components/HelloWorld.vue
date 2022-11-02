<template>
  <div>
    {{breeds}}
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    this.fetchBreeds
  },
  computed: {
    ...mapGetters({
      breeds: 'breeds'
    }),
    ...mapActions({
      fetchBreeds: 'fetchBreeds'
    }),
  }
}
</script>

<style scoped lang="scss">

</style>
