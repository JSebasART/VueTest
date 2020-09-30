<template>
  <div class="container mt-6 p-5 bg-gray-300 rounded-lg b-4">
    <div id="form" class="my-4 mx-10">
      <form v-on:submit.prevent="add">
        <b-field grouped>
          <b-field label="ID" label-position="on-border">
            <b-input v-model="currentObj.id" disabled></b-input>
          </b-field>
          <b-field expanded label="Name" label-position="on-border">
            <b-input v-model="currentObj.name"></b-input>
          </b-field>
          <b-field expanded label="Species" label-position="on-border">
            <b-input v-model="currentObj.species"></b-input>
          </b-field>
        </b-field>
        <b-field grouped class="my-8">
          <b-field label="Gender" label-position="on-border">
            <b-select
              placeholder="Gender"
              icon="account"
              v-model="currentObj.gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="unknown" selected>Unknown</option>
            </b-select>
          </b-field>
          <b-field label="Episodes" label-position="on-border">
            <b-select v-model="selectedEpisodes" disabled>
              <option
                v-for="episode in episodes"
                :key="episode.id"
                :value="episode.url"
                >{{ episode.name }}</option
              >
            </b-select>
          </b-field>
          <b-field label="Origin" label-position="on-border" expanded>
            <b-input v-model="currentObj.origin.name"></b-input>
          </b-field>
          <b-field label="Current Location" label-position="on-border" expanded>
            <b-input v-model="currentObj.location.name"></b-input>
          </b-field>
        </b-field>
        <b-field grouped class="mt-4">
          <b-field expanded>
            <section class="mt-6">
              <b-field class="my-4">
                <b-input
                  placeholder="Image URL"
                  size="is-medium"
                  icon="billiards"
                  v-model="currentObj.image"
                >
                </b-input>
              </b-field>
              <b-field class="mt-10">
                <b-button type="is-dark is-medium mr-5" v-on:click="clear" >Clear Selection</b-button>
                <b-button
                  type="is-success is-medium"
                  native-type="submit"
                  icon-left="plus-circle-outline"
                  v-if="focused == false"
                  >Add character</b-button
                >
              </b-field>
            </section>
          </b-field>
          <b-field>
            <b-image
              :src="currentObj.image"
              alt="A random image"
              rounded
              class="w-48"
              v-if="imgfocused == true"
            ></b-image>
            <b-image
              src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
              alt="A random image"
              rounded
              class="w-48"
              v-if="imgfocused == false"
            ></b-image>
          </b-field>
        </b-field>
      </form>
    </div>
    <div id="table" class="p-4">
      <b-table
        :data="characters"
        :selected.sync="currentObj"
        focusable
        default-sort
        paginated
        per-page="10"
      >
        <b-table-column
          field="id"
          label="ID"
          width="80"
          sortablenumeric
          v-slot="props"
          searchable
        >
          {{ props.row.id }}
        </b-table-column>
        <b-table-column
          field="name"
          label="Name"
          sortable
          v-slot="props"
          searchable
        >
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="species" label="Specie" sortable v-slot="props">
          {{ props.row.species }}
        </b-table-column>
        <b-table-column field="status" label="Status" sortable v-slot="props">
          {{ props.row.status }}
        </b-table-column>
        <b-table-column
          field="origin.name"
          label="Origin"
          sortable
          v-slot="props"
        >
          {{ props.row.origin.name }}
        </b-table-column>
        <b-table-column
          field="location.name"
          label="Current location"
          sortable
          v-slot="props"
        >
          {{ props.row.location.name }}
        </b-table-column>
        <b-table-column width="60" v-slot="props">
          <div class="container">
            <b-button
              type="is-danger"
              icon-right="delete"
              @click="confirmCustomDelete(props.row.id)"
            />
          </div>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data: () => ({
    characters: [],
    currentObj: {
      id: 0,
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      origin: {
        name: "",
      },
      location: {},
      image: "",
      episode: {},
      url: "",
      created: "",
    },
    focused: false,
    imgfocused:false,
    episodes: {},
    selectedEpisodes: {},
  }),
  created() {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        this.characters = response.data.results.map((character) => character);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((response) => {
        this.episodes = response.data.results.map((episode) => episode);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  watch: {
    currentObj: function(val) {
      if (!(val.id === 0)) {
        this.focused = true;
        
      }
      if (this.currentObj.image=="") {this.imgfocused=false}else{this.imgfocused=true}
    },
  },
  methods: {
    confirmCustomDelete: function(id) {
      this.$buefy.dialog.confirm({
        title: "Deleting account",
        message:
          "Are you sure you want to <b>delete</b> your account? This action cannot be undone.",
        confirmText: "Delete Account",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.delete(id),
      });
    },
    delete: function(id) {
      this.characters.splice(
        this.characters.findIndex((element) => element.id == id),
        1
      );
      this.currentObj = {
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        origin: {
          name: "",
        },
        location: {},
        image: "",
        episode: {},
        url: "",
        created: "",
      };
      this.focused = false;
      this.imgfocused=false;
      this.$buefy.toast.open("Account deleted!");
    },
    add:function(){
      this.currentObj.id = this.characters.length + 1;
      this.currentObj.created = Date.now();
      this.characters.push(this.currentObj);
      this.focused = true;
          if (this.currentObj.image=="") {
           this.imgfocused=false;
          }
      this.$buefy.toast.open("Added succesfully");
    },
    clear:function(){
      this.currentObj="";
      this.currentObj = {
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        origin: {
          name: "",
        },
        location: {},
        image: "",
        episode: {},
        url: "",
        created: "",
      };
      this.focused = false;
    }
  },
};
</script>
a
