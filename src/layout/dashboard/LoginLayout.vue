<template>
  <div class="wrapper login">
    <div class="main-panel">
      <form class="login-form" @submit.prevent="onSubmit">
        <div class="row">
          <h1>Login</h1>
        </div>
        <div class="row">
          <label v-show="error" style="text-align: center">{{ error }}</label>
        </div>
        <div class="row" style="margin-bottom:15px">
          <label style="color: white">User Name</label>
          <input
            type="text"
            name="user"
            id="userName"
            v-model="userName"
          />
        </div>
        <div class="row">
          <label style="color: white">Password </label>
          <input
            type="password"
            name="password"
            id="passWord"
            v-model="password"
          />
        </div>
        <div class="row" style="float: right;margin:5% 16% 0 0;backgroud:none">
          <base-button style="border:solid 1px white">Login</base-button>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import BaseButton from '../../components/BaseButton.vue';
export default {
  data: () => {
    return {
      error:'',
      currentUrl: false,
    };
  },
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    BaseButton,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  watch: {
    "this.currentUrl": function (old_value, new_value) {
      if (currentUrl == "/login") {
        this.currentUrl == true;
      } else {
        this.currentUrl == false;
      }
    },
  },
};
</script>
