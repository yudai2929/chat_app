<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import GoogleIcon from '@/icons/googleIcon.vue';

const router = useRouter();

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      router.push({ path: '/' });
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<template>
  <el-row justify="center" style="margin-top: 20vh">
    <el-card shadow="never" style="width: 400px; height: 400px">
      <div>
        <h1 style="font-size: large; text-align: center">ログイン</h1>
      </div>
      <el-divider />
      <el-row justify="center" style="align-items: center; height: 250px">
        <el-button @click="loginWithGoogle">
          <google-icon style="height: 24px; width: 24px" />
          <span style="margin-left: 12px">Googleアカウントでサインイン</span>
        </el-button>
      </el-row>
    </el-card>
  </el-row>
</template>
