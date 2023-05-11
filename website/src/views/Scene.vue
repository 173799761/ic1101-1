<template>
  <div class="scene" id="scene"></div>
</template>

<script setup>
import Base3d2 from "../utils/Base3d2.js";
import { reactive, onMounted } from "vue";

const data = reactive({
  base3d: {},
});
onMounted(() => {
  data.base3d = new Base3d2("#scene");
});
</script>


<style lang="less" scoped>
.scene {
  width: 100%;
  /* height: 100%; */
  background: url(../assets/images/starry_sky_bg.jpg) no-repeat center;
  background-size: cover;
}
</style>