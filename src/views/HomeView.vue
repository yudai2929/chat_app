<template>
  <h1 class="headline">上京したてでお金のない大学生でも大丈夫！</h1>
  <h1 class="headline">楽器の弾ける格安賃貸をご案内</h1>
  <ElRow justify="center">
    <ElCol :span="30">
      <div class="free">
        フリーワードで検索
        <ElInput v-model="text" type="text" />
        <el-button type="primary" :icon="Search" @click="onSearch"
          >検索</el-button
        >
      </div>
    </ElCol>
    <!--ここに地図上での表示をお願いします queryResultに情報が帰ってきます-->
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
</script>

<style>
.headline {
  margin: 50px 50px;
  font-size: 30px;
  text-align: center;
}

.free {
  margin: 50px 50px;
  float: left;
  text-align: center;
}
</style>
