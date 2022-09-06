<template>
  <ElRow justify="center">
    <ElCol :span="6">
      <table>
        <label for="free word">ワード検索</label>
        <ElInput v-model="text" type="text" />
        <el-button type="primary" :icon="Search" @click="onSearch"
          >検索</el-button
        >
        <el-button type="info"
          ><router-link :to="{ name: 'search' }"
            >絞り込み</router-link
          ></el-button
        >
      </table>
      <div v-if="queryResult">
        <BukkenPropertyCard
          v-for="res in queryResult.results"
          :key="res.buildingGuid"
          :building-property-preview="res"
        />
      </div>
    </ElCol>
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
