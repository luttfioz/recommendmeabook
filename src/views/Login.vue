<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: 'joe@creativeadvtech.com',
      pass: 'password1',
      error: false,
      loading: false,
      message: '',
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
    if (this.loggedIn) {
      this.$router.push('/dashboard');
    }
  },
});
</script>

<template>
  <ul class="text-right p-4 pr-4 font-semibold bg-white-100">
    <li class="inline mx-2 text-blue-600 hover:text-pink-400 cursor-pointer">
      <img src="../assets/lang.png" class="inline w-8 float-right" />
    </li>
  </ul>
  <div class="container w-96 mx-auto my-2 text-center ">
    <img src="../assets/Earthlink-Logo.png" />
    <h1 class="font-bold text-2xl">Sign in to Task Manager</h1>
  </div>
  <div class="container w-96 mx-auto px-6 py-6 shadow">
    <p v-if="$route.query.redirect">You need to login first.</p>
    <form @submit.prevent="login">
      <div class="flex flex-col my-5">
        <label class="my-2" for="uname">Email</label>
        <input
          type="text"
          v-model="email"
          placeholder="email"
          class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm  text-gray-500"
        />
        <label class="my-2" for="psw">Password</label>
        <input
          type="password"
          v-model="pass"
          placeholder="password"
          class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm  text-gray-500"
        />
        <div>
          <input
            class="inline-block rounded-sm"
            type="checkbox"
            id="keep"
            name="keep"
          />
          <label class="ml-2 inline-block" for="keep"> Keep me logged in</label>
          <a
            class="ml-2 inline-block float-right cursor-pointer text-blue-900 font-semibold"
          >
            Forgot password?</a
          >
        </div>
      </div>
      <div class="text-center mt-3">
        <button
          type="submit"
          class="w-full px-7 py-3 font-semibold text-white rounded bg-blue-900"
        >
          Sign in
        </button>
      </div>
      <p v-if="message" class="error">{{ message }}</p>
    </form>
  </div>
</template>

<style>
.error {
  color: red;
}
</style>
