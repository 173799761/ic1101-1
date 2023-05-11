<template>
  <div class="Box">
    <el-empty>
      <el-button type="primary" @click="gotoGamePage">Go to game page</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const gotoGamePage = () => {
  router.push("./");
};
</script>

<style lang="less" scoped>
.Box {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
