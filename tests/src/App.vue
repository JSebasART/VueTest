<template>
  <div id="app" class="h-full bg-gray-600 pb-6">
    <header class="bg-gradient-to-r to-purple-600 from-indigo-400 pt-5 px-4 rounded-b-lg ">
      <div class="media">
        <div class="media-content">
          <ul class="flex text-xl pl-2 mb-3">
            <li class="mr-6">
              <router-link class="text-gray-800 p-2 rounded-lg focus:text-white focus:bg-black" to="/characters" >characters</router-link>
            </li>
            <li class="mr-6">
              <router-link class="text-gray-800 p-2 rounded-lg focus:text-white focus:bg-black" to="/">Billing</router-link>
            </li>
            <!-- <li class="mr-6">
              <router-link class="text-gray-800 p-2 hover:text-blue-800" href="/">Link</router-link>
            </li> -->
          </ul>
        </div>
        <div class="media-right">
          
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selected: 1,
    };
  },
  computed: {
    navclass: function(current) {
      if (current == this.selected) {
        return "inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white";
      } else {
        return "inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3";
      }
    },
  },
};
</script>
