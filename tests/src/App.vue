<template>
  <div id="app">
    <p>{{mesage}}</p>
    <input type="text" v-model="mesage">
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mesage:"holas"
    };
  },
  components: {
  }
}
</script>
