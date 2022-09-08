<script lang="ts" setup>
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useUser } from '@/composables/useUser';

const { user } = useUser();

const router = useRouter();

const onClickSignIn = () => {
  router.push({ path: '/login' });
};
const signOutWithGoogle = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      router.push({ path: '/login' });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <el-header style="padding: 0; position: fixed; width: 100%; z-index: 100">
    <el-menu
      default-active="home"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#9BCDFF"
      text-color="#fff"
      active-text-color="#fff"
      :ellipsis="false"
      router
      style="padding: 0 96px"
      ><el-row justify="space-between" style="width: 100%">
        <el-row>
          <el-menu-item
            index="0"
            style="font-weight: bold; color: #303133; font-size: 24px"
            >サービス名</el-menu-item
          >
        </el-row>
        <el-row>
          <el-row>
            <el-menu-item index="/chat" style="font-weight: bold"
              >チャット</el-menu-item
            >
            <el-menu-item index="about" style="font-weight: bold"
              >絞り込み</el-menu-item
            >
          </el-row>
          <el-row justify="center" align="middle" style="margin-left: 24px">
            <el-button
              v-if="user"
              type="primary"
              plain
              @click="signOutWithGoogle"
              >ログアウト</el-button
            >
            <el-button v-else type="primary" plain @click="onClickSignIn"
              >ログイン</el-button
            >
          </el-row>
        </el-row>
      </el-row>
    </el-menu>
  </el-header>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
