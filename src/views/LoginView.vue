<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useUser } from '@/composables/useUser';
import GoogleIcon from '@/icons/GoogleIcon.vue';
import { computed, ref, watch } from 'vue';
import { db } from '@/plugins/firebase';
import { doc, getDoc } from 'firebase/firestore';

const router = useRouter();
const { user } = useUser();

const profileExits = ref(false);

const emailAddress = computed(() => {
  return user.value?.email;
});

const fetchProfile = async (emailAddress: string) => {
  const docRef = doc(db, 'profile', emailAddress);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    profileExits.value = true;
  }
};

// databaseに値が存在する場合 -> "/"
// databaseに値が存在しない場合 -> "/register"
watch(emailAddress, async () => {
  console.log('address changed');
  if (!emailAddress.value) return;
  await fetchProfile(emailAddress.value);
  if (profileExits.value) {
    router.push({ path: '/' });
  } else {
    router.push({ path: '/register' });
  }
});

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider).catch((error) => {
    console.error(error);
  });
};
</script>

<template>
  <el-row
    justify="center"
    style="padding-top: 20vh; min-height: calc(100vh - 57px)"
  >
    <el-card shadow="never" style="width: 400px; height: 400px">
      <div>
        <h1 style="font-size: large; text-align: center">ログイン</h1>
      </div>
      <el-divider />
      <el-row justify="center" style="align-items: center; height: 250px">
        <el-button @click="loginWithGoogle">
          <GoogleIcon style="height: 24px; width: 24px" />
          <span style="margin-left: 12px">Googleアカウントでサインイン</span>
        </el-button>
      </el-row>
    </el-card>
  </el-row>
</template>
