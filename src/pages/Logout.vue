<template></template>
<script>
import secure from "secure-ls";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    let ls = new secure();
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.$router.push("/");
    } else {
      this.$router.push("/");
    }
  },
};
</script>
<style>
</style>
