<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

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
  <div :class="$style.container">
    <el-row justify="center">
      <el-card shadow="never" style="width: 400px">
        <template #header>
          <div>
            <h1 style="font-size: large; text-align: center">ログイン</h1>
          </div>
        </template>
        <el-form label-width="8rem">
          <el-row justify="center">
            <el-button type="primary" @click="loginWithGoogle"
              >Googleアカウントでサインイン</el-button
            >
          </el-row>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<style module lang="scss">
.container {
  margin-top: 25vh;
}
</style>
