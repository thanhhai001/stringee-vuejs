<template>
  <div class="wrapper profile">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/home"
          :name="$t('Home')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/stream"
          :name="$t('stream')"
          icon="tim-icons icon-video-66"
        />
        <sidebar-link
          to="/create-course"
          :name="$t('Create Course')"
          icon="tim-icons icon-simple-add"
        />
        <sidebar-link
          to="/course"
          :name="$t('Course')"
          icon="tim-icons icon-book-bookmark"
        />
        <sidebar-link
          to="/profile"
          :name="$t('User Profile')"
          icon="tim-icons icon-single-02"
        />
        <sidebar-link
          to="/statistical"
          :name="$t('statistical')"
          icon="tim-icons icon-chart-bar-32"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <div class="content">
        <fade-transition :duration="100" mode="out-in">
          <div class="row">
            <div class="col-md-8">
              <edit-profile-form :model="model"> </edit-profile-form>
            </div>
            <div class="col-md-4">
              <user-card :user="user"></user-card>
            </div>
          </div>
        </fade-transition>
      </div>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
import User from "../util/process/User";
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
import TopNavbar from "../layout/dashboard/TopNavbar.vue";
import ContentFooter from "../layout/dashboard/ContentFooter.vue";
import MobileMenu from "../layout/dashboard/MobileMenu";
import { FadeTransition } from "vue2-transitions";
import secure from "secure-ls";
export default {
  components: {
    FadeTransition,
    EditProfileForm,
    UserCard,
    TopNavbar,
    ContentFooter,
    MobileMenu,
  },
  mounted() {
    let ls = new secure();
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
      this.user = ls.get("user");
      this.getUserInfo();
    }
  },
  data() {
    return {
      user:{},
      model: {
        id: "",
        email: "",
        username: "",
        fullName: "",
        address: "",
      },
      user: {
        fullName: "",
        title: "Student",
        description: `Đang làm đồ án`,
      },
    };
  },
  methods:{
    async getUserInfo() {
      var result = await User.getUserById({userId: this.user.id});
      if (result.data.status) {
        this.setValue(result.data.user);
      }
    },
    setValue(user) {
      this.model.id = user.id;
      this.model.email = user.email;
      this.model.fullName = user.fullName;
      this.user.fullName = user.fullName;
      this.model.address = user.address;
    }
  }
};
</script>
<style>
.profile .card {
  height: 500px;
}
</style>
