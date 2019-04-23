<template>
  <div class="root">
    <h4>Student experience update page.</h4>
    <router-link to="/Edit">Edit</router-link>
    |
    <router-link to="/EditEducations">Edit Education</router-link>
    |
    <router-link to="/EditCapstones">Edit Capstones</router-link>
    |
    <router-link to="/EditExperiences">Edit Experience</router-link>

    <div v-for="error in errors">
      {{ error }}
    </div>

    <form v-on:submit.prevent="updateExperience()">
      <p>
        Start Date:
        <input type="text" v-model="experience.start_date" />
      </p>
      <p>
        End Date:
        <input type="text" v-model="experience.end_date" />
      </p>
      <p>
        Job Title:
        <input type="text" v-model="experience.job_title" />
      </p>
      <p>
        Company Name:
        <input type="text" v-model="experience.company_name" />
      </p>

      <input type="submit" value="Update experience information" />
      <!-- <button>Make a new experience</button> -->
    </form>
    <!--     <button v-on:click="deleteExperience()">Delete experience</button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      experience: {
        start_date: "",
        end_date: "",
        job_title: "",
        company_name: "",
        id: ""
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/experiences/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.experience = response.data;
    });
  },
  methods: {
    updateExperience: function() {
      console.log("making the new experience");
      // make a request to the api to the create action
      // response = HTTP.get("/api/experiences")
      // experiences = reponse.parse
      var params = {
        start_date: this.experience.start_date,
        end_date: this.experience.end_date,
        job_title: this.experience.job_title,
        company_name: this.experience.company_name
      };
      console.log(params);
      axios
        .patch("/api/experiences/" + this.$route.params.id, params)
        .then(response => {
          console.log("things are going well");
          console.log(response);
          this.$router.push("/experiences/" + this.$route.params.id);
        })
        .catch(error => {
          console.log("things are going poorly");
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
    // deleteExperience: function() {
    //   console.log("deleting the experience...");
    //   // make an HTTP request using axios to the destroy action of my API
    //   axios.delete("/api/experiences/" + this.$route.params.id).then(response => {
    //     this.$router.push("/");
    //   });
    // }
  }
};
</script>
