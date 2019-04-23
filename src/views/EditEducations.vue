<template>
  <div class="root">
    <h4>Student education update page.</h4>
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

    <form v-on:submit.prevent="updateEducation()">
      <p>
        Start Date:
        <input type="text" v-model="education.start_date" />
      </p>
      <p>
        End Date:
        <input type="text" v-model="education.end_date" />
      </p>
      <p>
        Degree:
        <input type="text" v-model="education.degree" />
      </p>
      <p>
        University Name:
        <input type="text" v-model="education.university_name" />
      </p>

      <input type="submit" value="Update education information" />
      <!-- <button>Make a new education</button> -->
    </form>
    <!--     <button v-on:click="deleteEducation()">Delete education</button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      education: {
        start_date: "",
        end_date: "",
        degree: "",
        university_name: "",
        id: ""
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/educations/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.education = response.data;
    });
  },
  methods: {
    updateEducation: function() {
      console.log("making the new education");
      // make a request to the api to the create action
      // response = HTTP.get("/api/educations")
      // educations = reponse.parse
      var params = {
        start_date: this.education.start_date,
        end_date: this.education.end_date,
        degree: this.education.degree,
        university_name: this.education.university_name
      };
      console.log(params);
      axios
        .patch("/api/educations/" + this.$route.params.id, params)
        .then(response => {
          console.log("things are going well");
          console.log(response);
          this.$router.push("/educations/" + this.$route.params.id);
        })
        .catch(error => {
          console.log("things are going poorly");
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
    // deleteEducation: function() {
    //   console.log("deleting the education...");
    //   // make an HTTP request using axios to the destroy action of my API
    //   axios.delete("/api/educations/" + this.$route.params.id).then(response => {
    //     this.$router.push("/");
    //   });
    // }
  }
};
</script>
