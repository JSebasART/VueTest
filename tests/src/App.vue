<template>
  <div id="app">
    <p>{{mesage}}</p>
    <router-view></router-view>
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

