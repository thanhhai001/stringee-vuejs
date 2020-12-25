<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="Username"
                  placeholder="Username"
                  v-model="model.username"
                  disabled="disabled">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Email address"
                  type="email"
                  placeholder="mike@email.com"
                  v-model="model.email">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Phone number"
                  v-model="model.phoneNumber">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 pr-md-1">
        <base-input label="Full Name"
                  v-model="model.fullName"
                  placeholder="Full Name">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>address</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Here can be your address"
                    v-model="model.address">
              </textarea>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" @click="updateInfo" fill>Save</base-button>
  </card>
</template>
<script>
import User from "../../util/process/User";
import secure from "secure-ls";
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    mounted() {
      var ls = new secure();
      if (localStorage.getItem("user")) {
        var user = ls.get("user");
        this.model.id = user.id;
        this.model.username = user.userName;
        this.model.email = user.email;
        this.model.phoneNumber = user.phoneNumber;
        this.model.fullName = user.fullName;
        this.model.address = user.address;
        this.model.username = user.userName;
      } else {
        this.$router.push("/");
      }
    },
    methods:{
      async updateInfo() {
        var result = await User.updateUser(this.model);
        if(result.data.status) {
          window.location= ('/profile')
        }
      }
    }
  }
</script>
<style>
</style>
