<template>
  <div class="root">
    <h4>Student update page.</h4>
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

    <form v-on:submit.prevent="updateStudent()">
      <p>
        First_Name:
        <input type="text" v-model="student.first_name" />
      </p>
      <p>
        Last_Name:
        <input type="text" v-model="student.last_name" />
      </p>
      <p>
        Email:
        <input type="text" v-model="student.email" />
      </p>
      <p>
        Phone Number:
        <input type="text" v-model="student.phone_number" />
      </p>
      <p>
        Short Bio:
        <input type="text" v-model="student.short_bio" />
      </p>
      <p>
        Linkedin:
        <input type="text" v-model="student.linkedin" />
      </p>
      <p>
        Website:
        <input type="text" v-model="student.website" />
      </p>
      <p>
        Student:
        <input type="text" v-model="student.student" />
      </p>
      <p>
        Github:
        <input type="text" v-model="student.github" />
      </p>
      <p>
        Photo:
        <input type="text" v-model="student.photo" />
      </p>

      <input type="submit" value="Update student information" />
      <!-- <button>Make a new student</button> -->
    </form>
    <p>
      <button v-on:click="deleteStudent()">Delete student</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      student: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        short_bio: "",
        linkedin: "",
        website: "",
        student: "",
        github: "",
        photo: "",
        id: ""
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/students/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.student = response.data;
    });
  },
  methods: {
    updateStudent: function() {
      console.log("making the new student");
      // make a request to the api to the create action
      // response = HTTP.get("/api/students")
      // students = reponse.parse
      var params = {
        first_name: this.student.first_name,
        email: this.student.email,
        short_bio: this.student.short_bio,
        phone_number: this.student.phone_number,
        linkedin: this.student.linkedin,
        last_name: this.student.last_name,
        website: this.student.website,
        student: this.student.student,
        github: this.student.github,
        photo: this.student.photo
      };
      console.log(params);
      axios
        .patch("/api/students/" + this.$route.params.id, params)
        .then(response => {
          console.log("things are going well");
          console.log(response);
          this.$router.push("/students/" + this.$route.params.id);
        })
        .catch(error => {
          console.log("things are going poorly");
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    deleteStudent: function() {
      console.log("deleting the student...");
      // make an HTTP request using axios to the destroy action of my API
      axios.delete("/api/students/" + this.$route.params.id).then(response => {
        this.$router.push("/");
      });
    }
  }
};
</script>
