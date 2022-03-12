<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: 'joe@example.com',
      pass: '',
      error: false,
      loading: false,
      message: '',
      count: 0,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    login() {
      this.loading = true;
      const username = this.email;
      const password = this.pass;
      const user = { username, password };

      this.$store.dispatch('auth/login', user).then(
        () => {
          debugger;
          this.$router.push('/dashboard');
        },
        (error: any) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },

  created() {
    // props are exposed on `this`
    console.log(`The created count is ${this.count}.`);
    debugger;
    if (this.loggedIn) {
      this.$router.push('/dashboard');
    }
  },

  mounted() {
    console.log(`The initial count is ${this.count}.`);
  },
});
</script>

<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">You need to login first.</p>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"/></label>
      <label
        ><input v-model="pass" placeholder="password" type="password"
      /></label>
      (hint: password1)<br />
      <button type="submit">login</button>
      <p v-if="message" class="error">Bad login information</p>
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<style>
.error {
  color: red;
}
</style>
