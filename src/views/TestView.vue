<script setup lang="ts">
import { useProfile } from '@/composables/useProfile';
import { useUser } from '@/composables/useUser';
import { db } from '@/plugins/firebase';
import { Message } from '@/types/Message';
import { RequestRoom } from '@/types/req/RequestRoom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const { user } = useUser();
const { profile, fetchProfile } = useProfile();
const router = useRouter();

const loading = ref(false);

const viewer = computed(() => {
  if (!profile.value) return;
  return {
    userName: profile.value.name,
    imageUrl: profile.value.imageUrl,
    id: profile.value.email,
  };
});

const landlord = computed(() => {
  return {
    // dejimaAPIから取得した物件名を入れてください。
    buildingName: 'サクラダファミリア新葛西305 /アパ不動産',
    imageUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    id: 'hoge@example.com',
  };
});
const postRoom = async (room: RequestRoom) => {
  loading.value = true;
  await addDoc(collection(db, 'rooms'), room);
};

const onClickApply = async () => {
  const email = user.value?.email;
  if (!email) {
    router.push({ path: '/login' });
  }

  //チャットルームを作成するためにプロフィールを取得する
  await fetchProfile();

  if (!viewer.value || !landlord.value) return;

  //テンプレートテキストを生成
  const messages: Message[] = [
    {
      createAt: Timestamp.now(),
      postUser: viewer.value.id,
      text: '内見したいです!',
      isRead: false,
    },
  ];
  const room: RequestRoom = {
    viewer: viewer.value,
    landlord: landlord.value,
    updateAt: Timestamp.now().toDate(),
    messages: messages,
  };
  postRoom(room)
    .then(() => {
      router.push({ path: '/chat' });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <div>
    testページ
    <el-button v-loading.fullscreen.lock="loading" @click="onClickApply">
      内見を申し込む
    </el-button>
  </div>
</template>
