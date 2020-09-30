Vue.config.devtools = true;
var app = new Vue({
  el: "#app",
  created() {
    fetch("https://rickandmortyapi.com/api/character")
        .then((respuesta) => respuesta.json())
        .then(
          (respuesta) =>
            (this.characters = respuesta.results. map((character) => character))
        );
    fetch("https://rickandmortyapi.com/api/location")
      .then((respuesta) => respuesta.json())
      .then(
        (respuesta) =>
          (this.location = respuesta.results.map((location) => location))
      );
    fetch("https://rickandmortyapi.com/api/episode")
      .then((respuesta) => respuesta.json())
      .then(
        (respuesta) =>
          (this.episodes = respuesta.results.map((episode) => episode))
      );
  },
  data: {
    activeTab: 0,
    sort: "",
    down: false,
    characters: [],
    location: [],
    episodes: [],
    value: { id: 0 },
    valueBase: {
      id: 0,
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      origin: {},
      location: {},
      url: "",
      image: "",
      episode: {},
      url: "",
      created: "",
    },
    focus: false,
    selected: [],
    columns: [
      {
        field: "id",
        label: "ID",
        width: "40",
        numeric: true,
        searchable: true,
      },
      {
        field: "name",
        label: "Name",
        searchable: true,
      },
      {
        field: "gender",
        label: "Gender",
      },
      {
        field: "species",
        label: "Species",
        searchable: true,
      },
      {
        field: "status",
        label: "Status",
        centered: true,
      },
    ],
    //Episodes required Data
    SelectedCharacters: {},
    E_value: {},
    E_columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
          searchable: true,
        },
        {
          field: "name",
          label: "Name",
          searchable: true,
        },
        {
          field: "episode",
          label: "Episode",
        },
        {
          field: "created",
          label: "Date Created",
          searchable: true,
        },
        {
          field: "air_date",
          label: "Air date",
          centered: true,
        },
        {
          field: "gender",
          label: "Gender",
        },
      ]
  },
  watch: {
    value: function (val) {
      if (!(val.id === 0)) {
        this.focus = true;
      }
    },
    E_value: function (val) {
        if (!(val.id === 0)) {
          this.focus = true;
        }
      },
  },
  methods: {
    add() {
        console.log("entra");
      this.value.id = this.characters.length + 1;
      this.value.created = Date.now();
      this.characters.push(this.value);
      this.focus = true;
      this.$buefy.toast.open("Added succesfully");
    },
    clear() {
      this.value = "";
      this.focus = false;
      this.down = false;
      this.value = JSON.parse(JSON.stringify(this.valueBase));
      this.value.id = 0;
    },
    select(character) {
      this.value = character;
      this.down = true;
    },
    modify() {
      const elementsIndex = this.characters.findIndex(
        (element) => element.id == this.value.id
      );
      this.characters[elementsIndex] = this.value;
      alert();
    },
    delete() {
      this.characters.splice(
        this.characters.findIndex((element) => element.id == this.value.id),
        1
      );
      this.value = "";
      this.focus = false;
      this.down = false;
      this.value = JSON.parse(JSON.stringify(this.valueBase));
      this.value.id = 0;
      this.$buefy.toast.open("Account deleted!");
    },
    Delete() {
      if (this.value.id === 0) {
        this.$buefy.toast.open("You need to select a character before");
      } else {
        this.$buefy.dialog.confirm({
          title: "Deleting account",
          message:
            "Are you sure you want to <b>delete</b> your account? This action cannot be undone.",
          confirmText: "Delete Account",
          type: "is-danger",
          hasIcon: true,
          onConfirm: () => this.delete(),
        });
      }
    },

    // episodes methods
    E_add() {
      this.E_value.id = this.episodes.length + 1;
      this.E_value.created = Date.now();
      this.episodes.push(this.E_value);
      this.focus = true;
    },
    E_select(episode) {
      this.E_value = episode;
    },
    E_clear() {
      this.E_value = "";
      this.focus = false;
      this.E_value = {};
      this.E_value.id = 0;
    },
    E_Delete() {
      if (this.E_value.id === 0) {
        this.$buefy.toast.open("You need to select a episode before");
      } else {
        this.$buefy.dialog.confirm({
          title: "Deleting episode",
          message:
            "Are you sure you want to <b>delete</b> the selected episode.",
          confirmText: "Delete",
          type: "is-danger",
          hasIcon: true,
          onConfirm: () => this.E_deletes(),
        });
      }
    },
    E_deletes() {
      this.episodes.splice(this.E_value.id - 1, 1);
      this.episodes.splice(
        this.episodes.findIndex((element) => element.id == this.E_value.id),
        1
      );
      this.E_value = "";
      this.focus = false;
      this.E_value = {};
      this.E_value.id = 0;
      this.$buefy.toast.open("Episode Deleted!");
    },
  },
});

