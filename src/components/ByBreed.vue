<template>
  <div>
    <hello-world/>
    <dog-gallery/>
  </div>
</template>

<script>
import DogGallery from "./DogGallery";
import HelloWorld from "./HelloWorld";
export default {
  name: "ByBreed",
  components: {
    DogGallery,
    HelloWorld,
  }
}
</script>

<style scoped>

</style>