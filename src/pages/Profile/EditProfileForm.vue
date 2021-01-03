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
    <div v-show="admin" class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="All User" >
          <select v-model="userApprove">
            <option value="">Choose User to approve teacher</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{user.fullName}} - {{user.id}}</option>
          </select>
        </base-input>
      </div>
      <base-button slot="footer" style="margin: 25px 0 25px 25px;backgroud:brown" type="primary" @click="approveRole()" fill>Approve Teacher</base-button>
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
    data: () => {
      return {
        userLogin: [],
        users: [],
        admin: false,
        userApprove: ''
      }
    },
    mounted() {
      var ls = new secure();
      if (localStorage.getItem("user")) {
        this.userLogin = ls.get("user");
        var user = ls.get("user");
        this.model.id = user.id;
        this.model.username = user.userName;
        this.model.email = user.email;
        this.model.phoneNumber = user.phoneNumber;
        this.model.fullName = user.fullName;
        this.model.address = user.address;
        this.model.username = user.userName;
        if(this.userLogin.role == 1) {
          this.admin = true;
          this.getAllUser();
        }
        
      } else {
        this.$router.push("/");
      }
    },
    methods:{
      async approveRole() {
        var result = await User.approveUser({userId: this.userApprove});
        if(result.data.status) {
          alert(result.data.message);
        }
      },
      async getAllUser() {
        var result = await User.getUser();
        if(result.data.status) {
         this.users = result.data.users;
         console.log(this.users);
        }
      },
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
select {
  background: rgb(34, 42, 66, 30%);
  border: solid 1px #2b3553;
  border-radius: 0.4285rem;
  font-size: 0.75rem;
  font-family: "Poppins", sans-serif;
  height: calc(2.25rem + 2px);
  width: 100%;
  color: rgba(255,255,255, .8);
  padding: 10px 18px 10px 18px;
}
select:focus {
  color: rgba(255,255,255, .8);
  border-color: #e14eca;
  outline: 0;
}
option{
  background: white;
  color: black;
}
</style>
