<template>
  <h1 class="headline">上京したてでお金のない大学生でも大丈夫！</h1>
  <h1 class="headline">楽器の弾ける格安賃貸をご案内</h1>
  <ElRow justify="center">
    <ElCol :span="12">
      <div class="free">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="1px"
        >
          <el-form-item label="" prop="search">
            <el-input v-model="ruleForm.search" type="text" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :icon="Search"
              @click="searchForm(ruleFormRef)"
              >検索</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
        <div v-if="queryResult" class="panel">
          <BukkenPropertyCard
            v-for="res in queryResult.results"
            :key="res.buildingGuid"
            :building-property-preview="res"
          />
        </div>
      </div>
    </ElCol>
    <!--物件情報-->
  </ElRow>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import BukkenPropertyCard from '@/components/BukkenPropertyCard.vue';
import {
  BuildingPropertyList,
  Configuration,
  RentPropertyQueryAPIApi,
  LineAggregateResult,
  LineLevel,
} from '@/dejima/property';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  search: '',
});

const rules = reactive<FormRules>({
  search: [{ required: true, message: '未入力です', trigger: 'blur' }],
});

// dejimaAPIクライアントを初期化
const rentPropertyQueryAPI = new RentPropertyQueryAPIApi(new Configuration());
// 検索結果を受け取る変数を用意。初期値は簡単のためとりあえず`null`にしておく
const queryResult = ref<BuildingPropertyList | null>(null);
const onSearch = async () => {
  // 検索ボタンが押されたらinputフォームの入力で物件を検索し、結果を`queryResult`に代入する
  queryResult.value = await rentPropertyQueryAPI.searchRentPropertyByBuilding({
    buildingName: ruleForm.search,
  });
};

// 駅情報に関する取得 表示部分が未完成なので一旦建物情報のみの検索とする
// const queryResult = ref<LineAggregateResult | null>(null);
// const onSearch = async () => {
//   queryResult.value = await rentPropertyQueryAPI.aggregateRentPropertyByLine({
//     level: LineLevel.Station,
//     buildingName: text.value,
//   });
// };

const searchForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) onSearch();
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  queryResult.value = null;
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
  text-align: center;
}

.panel {
  text-align: left;
}
</style>
