<template>
  <div class="wrapper login"  @keyup.enter="keyLogin">
    <div class="main-panel">
      <form class="login-form">
        <div class="row" style="height:40px">
          <h1>Register</h1>
        </div>
        <div class="row" style="height: 100px;color:green" v-show="success">
          <label style="margin-left: -45px; text-align: center; width: 100%">{{ success }}</label>
        </div>
        <div class="row error-message" style="height: 100px" v-show="errors">
          <label v-for="error in errors" :key="error" style="margin-left: -45px; text-align: center; width: 100%">*{{ error }}</label>
        </div>
        <div class="row" style="margin-bottom: 15px">
          <label style="color: white">Your Name</label>
          <input type="text" name="user" id="fullName" v-model="fullName" />
        </div>
        <div class="row" style="margin-bottom: 15px">
          <label style="color: white">User Name</label>
          <input type="text" name="user" id="userName" v-model="userName" />
        </div>
        <div class="row" style="margin-bottom: 15px">
          <label style="color: white">Password </label>
          <input
            type="password"
            name="password"
            id="passWord"
            v-model="password"
          />
        </div>
        <div class="row">
          <label style="color: white">Re-Password </label>
          <input
            type="password"
            name="repassword"
            id="repassWord"
            v-model="repassword"
          />
        </div>
        <div
          class="row" style="float: right; margin: 7% 20% 0 0; backgroud: none"
        >
          <base-button style="border: solid 1px white;width:140px;" @click="onSignUp">Sign Up</base-button>
          <base-button style="margin-left: 20px; border: solid 1px white ;width:140px" @click="onRegister">Register</base-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import User from "../util/process/User";
import secure from "secure-ls";
export default {
  components: {},
  data() {
    return {
      fullName: "",
      userName: "",
      password: "",
      repassword: "",
      errors: [],
      success: '',
    };
  },
  mounted() {
  },
  methods: {
    async onSignUp() {
      this.$router.push("/");
    },
    async onRegister() {
      this.success = "";
      this.errors = "";
      var result = await User.register({
        fullName: this.fullName,
        userName: this.userName,
        password: this.password,
        repassword: this.repassword,
      });
      if (result.data.status) {
        let ls = new secure();
        this.success = result.data.message;
        ls.set('message', result.data.message);
        this.$router.push("/");
      } else {
        this.success = "";
        this.errors = result.data.message;
      }
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style>
.login .main-panel {
  background-image: url("../assets/images/123.jpg");
  background-position: right;
  background-size: cover;
}
.login .login-form {
  float: right;
  width: 35%;
  height: 250px;
  margin: 12% 8% 0 0;
}
.login .login-form .row {
  margin: 0 0 0 10%;
}
.login .login-form .row label {
  width: 30%;
  margin: 0;
}
.login .login-form .row input {
  padding: 0;
  outline: none;
  background: bottom;
  border-bottom: 2px solid burlywood;
  color: white;
}

.login .login-form .row input[placeholder] {
  color: white;
}
.login-form .error-message {
  color: red;
  text-align: center;
  padding: 10px 0;
  width: 100%;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  background: bottom;
  -webkit-text-fill-color: white;
  transition: background-color 5000s ease-in-out 0s;
}

::-webkit-input-placeholder {
  color: red;
}
</style>
