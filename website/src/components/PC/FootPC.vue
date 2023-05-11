<template>
  <div class="foot">
    <div class="foot_part">
      <div class="marginTop">© 2022 Abstracta Labs Pte. Ltd. All rights reserved.</div>
    </div>
  </div>
</template>

<script setup>
</script>


<style lang="less" scoped>
.foot {
  display: flex;
  justify-content: space-between;
  // background-color: #080b0f;
  // background: linear-gradient(
  //         to right,
  //         rgba(239, 40, 127, 1),
  //         rgba(123, 109, 215, 1),
  //         rgba(104, 179, 246, 1),
  //       );
  height: 68px;
  align-items: center;
  justify-content: center;
}

.foot_part{
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marginLeft{
  margin-left: 44px;
}

.marginTop {
  font-size: 13px;
  color: #757474;
}


@media screen and (max-width: 500px) {
}
</style>
