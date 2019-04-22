<template>
  <div class="root">
    <h4>Student capstone update page.</h4>
    <div v-for="error in errors">
      {{ error }}
    </div>

    <form v-on:submit.prevent="updateCapstone()">
      <p>
        Name:
        <input type="text" v-model="capstone.name" />
      </p>
      <p>
        Description:
        <input type="text" v-model="capstone.description" />
      </p>
      <p>
        URL:
        <input type="text" v-model="capstone.url" />
      </p>
      <p>
        Screenshot:
        <input type="text" v-model="capstone.screenshot" />
      </p>

      <input type="submit" value="Update capstone information" />
      <!-- <button>Make a new capstone</button> -->
    </form>
    <!--     <button v-on:click="deleteCapstone()">Delete capstone</button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      capstone: {
        name: "",
        description: "",
        url: "",
        screenshot: "",
        id: ""
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/capstones/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.capstone = response.data;
    });
  },
  methods: {
    updateCapstone: function() {
      console.log("making the new capstone");
      // make a request to the api to the create action
      // response = HTTP.get("/api/capstones")
      // capstones = reponse.parse
      var params = {
        name: this.capstone.name,
        description: this.capstone.description,
        url: this.capstone.url,
        screenshot: this.capstone.screenshot
      };
      console.log(params);
      axios
        .patch("/api/capstones/" + this.$route.params.id, params)
        .then(response => {
          console.log("things are going well");
          console.log(response);
          this.$router.push("/capstones/" + this.$route.params.id);
        })
        .catch(error => {
          console.log("things are going poorly");
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
    // deleteCapstone: function() {
    //   console.log("deleting the capstone...");
    //   // make an HTTP request using axios to the destroy action of my API
    //   axios.delete("/api/capstones/" + this.$route.params.id).then(response => {
    //     this.$router.push("/");
    //   });
    // }
  }
};
</script>
