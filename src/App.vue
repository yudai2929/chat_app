<template>
  <div>
    <el-menu
      default-active="home"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :ellipsis="false"
      router
    >
      <el-menu-item index="0"
        >2022サマーインターンボイラープレート</el-menu-item
      >
      <div class="flex-grow"></div>
      <el-menu-item index="home">Home</el-menu-item>
      <el-menu-item index="about">About</el-menu-item>
      <el-menu-item index="login">Login</el-menu-item>
    </el-menu>
    <RouterView />
  </div>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
