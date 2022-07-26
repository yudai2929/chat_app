<script setup lang="ts">
import { reactive, ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/plugins/firebase';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const loginForm = reactive({
  email: '',
  password: '',
});

const login = async () => {
  isLoading.value = true;
  const userCredential = await signInWithEmailAndPassword(
    auth,
    loginForm.email,
    loginForm.password
  ).catch((e) => {
    console.error(e);
    isLoading.value = false;
  });
  if (!userCredential) return;

  console.log(`Signed in at ${userCredential.user.email}`);
  router.push((route.query.redirect as string) ?? { name: 'home' });
  isLoading.value = false;
};
</script>

<template>
  <div :class="$style.container">
    <el-row justify="center">
      <el-card
        v-loading.fullscreen.lock="isLoading"
        shadow="never"
        style="width: 400px"
      >
        <template #header>
          <div>
            <h1 style="text-align: center">ログイン</h1>
          </div>
        </template>
        <el-form label-width="8rem" :model="loginForm">
          <el-form-item label="メールアドレス" type="email">
            <el-input v-model="loginForm.email" />
          </el-form-item>
          <el-form-item label="パスワード">
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">ログイン</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<style module lang="scss">
.container {
  margin-top: 32px;
}
</style>
