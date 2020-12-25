<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/home"
          :name="$t('Home')"
          icon="tim-icons icon-chart-pie-36"
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
          to="/calendar"
          :name="$t('calendar')"
          icon="tim-icons icon-calendar-60"
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
            <div class="card">
            
            </div>
        </fade-transition>
      </div>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from "../layout/dashboard/TopNavbar.vue";
import ContentFooter from "../layout/dashboard/ContentFooter.vue";
import MobileMenu from "../layout/dashboard/MobileMenu";
import { FadeTransition } from "vue2-transitions";
import Stream from "../util/process/Stream";
export default {
  components: {
    FadeTransition,
    TopNavbar,
    ContentFooter,
    MobileMenu,
  },
  data: () => {
    return {
      room_id: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style>
#video-gird {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
}
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
