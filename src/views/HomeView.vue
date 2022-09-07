<template>
  <div style="margin: 50px 50px; font-size: 30px; text-align: center">
    上京したてでお金のない大学生でも大丈夫！<span
      >楽器の弾ける格安賃貸をご案内</span
    >
  </div>
  <ElRow justify="center">
    <ElCol :span="30">
      <div style="text-align: center; float: left; margin: 50px 50px">
        フリーワードで検索
        <ElInput v-model="text" type="text" />
        <el-button type="primary" :icon="Search" @click="onSearch"
          >検索</el-button
        >
      </div>
      <div style="text-align: center; float: right; margin: 50px 50px">
        大学名で検索
        <ElInput v-model="area" type="text" />
        <el-button type="primary" :icon="Search" @click="onSearch_area"
          >検索</el-button
        >
      </div>
    </ElCol>
    <!--ここに地図上での表示をお願いします-->
  </ElRow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import {
  BuildingPropertyList,
  Configuration,
  RentPropertyQueryAPIApi,
} from '@/dejima/property';

const text = ref('');
// dejimaAPIクライアントを初期化
const rentPropertyQueryAPI = new RentPropertyQueryAPIApi(new Configuration());
// 検索結果を受け取る変数を用意。初期値は簡単のためとりあえず`null`にしておく
const queryResult = ref<BuildingPropertyList | null>(null);
const onSearch = async () => {
  // 検索ボタンが押されたらinputフォームの入力で物件を検索し、結果を`queryResult`に代入する
  queryResult.value = await rentPropertyQueryAPI.searchRentPropertyByBuilding({
    buildingName: text.value,
  });
};

const area = ref('');
// dejimaAPIクライアントを初期化
const queryResult_area = ref<BuildingPropertyList | null>(null);
const onSearch_area = async () => {
  // 検索ボタンが押されたらinputフォームの入力で物件を検索し、結果を`queryResult`に代入する
  queryResult_area.value =
    await rentPropertyQueryAPI.searchRentPropertyByBuilding({
      buildingName: area.value,
    });
};
</script>
