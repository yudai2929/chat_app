<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { useUser } from '@/composables/useUser';
import { Profile } from '@/types/Profile';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/plugins/firebase';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useUser();

const formValue = reactive({
  name: '',
  address: '',
  sex: '',
  phoneNumber: '',
  content: undefined,
});
const formRef = ref<FormInstance>();
const loading = ref(false);

const postProfile = async (profile: Profile) => {
  loading.value = true;
  await setDoc(doc(db, 'profile', profile.email), profile);
};

const onSubmitForm = (formEl: FormInstance | undefined) => {
  const email = user.value?.email;
  const imageUrl = user.value?.photoURL;

  if (!formEl || !email || !imageUrl) return;

  //フォームの値が妥当かチェック
  formEl.validate(async (valid) => {
    if (!valid) return;
    const profile: Profile = { ...formValue, email, imageUrl };

    await postProfile(profile)
      .then(() => {
        router.push({ path: '/' });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 20vh">
    <el-card class="box-card">
      <template #header>
        <el-row justify="center"> 新規プロフィール登録 </el-row>
      </template>
      <el-form
        ref="formRef"
        :model="formValue"
        label-width="120px"
        style="width: 400px"
      >
        <el-form-item
          label="名前"
          prop="name"
          :rules="[
            { required: true, message: '名前は必須項目です' },
            { type: 'string', message: '氏名を入力してください' },
          ]"
        >
          <el-input v-model="formValue.name" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="性別"
          prop="sex"
          :rules="[{ required: true, message: '性別は必須項目です' }]"
        >
          <el-radio-group v-model="formValue.sex">
            <el-radio label="男性" />
            <el-radio label="女性" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="住所"
          prop="address"
          :rules="[
            { required: true, message: '住所は必須項目です' },
            { type: 'string', message: '住所を入力してください' },
          ]"
        >
          <el-input
            v-model="formValue.address"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="電話番号"
          prop="phoneNumber"
          :rules="[
            { required: true, message: '電話番号は必須項目です' },
            { type: 'string', message: '電話番号を入力してください' },
          ]"
        >
          <el-input
            v-model="formValue.phoneNumber"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="探したい家" prop="content">
          <el-input
            v-model="formValue.content"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading.fullscreen.lock="loading"
            type="primary"
            @click="onSubmitForm(formRef)"
            >新規登録</el-button
          >
          <el-button @click="resetForm(formRef)">リセット</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
