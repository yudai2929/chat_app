<script setup lang="ts">
import { BuildingPropertyPreview } from '@/dejima/property';
import { computed, toRefs } from 'vue';

export type Props = {
  buildingPropertyPreview: BuildingPropertyPreview;
};
const props = defineProps<Props>();
const { buildingPropertyPreview } = toRefs(props);

const publishedAt = computed(() => {
  return buildingPropertyPreview.value.property?.at(0)?.publishedDatetime ?? '';
});
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{
          `${buildingPropertyPreview.buildingName} ${buildingPropertyPreview.property[0].roomNumberText}号室：`
        }}</span>
        <router-link
          :to="`/detail/${buildingPropertyPreview.property[0].propertyFullKey}`"
          >詳細情報</router-link
        >
      </div>
    </template>
    <div>
      <p>住所：{{ buildingPropertyPreview.addressText }}</p>
      <p>構造：{{ buildingPropertyPreview.structure }}</p>
      <p>ポイント：{{ buildingPropertyPreview.property[0].salesPoint }}</p>
      <small class="published">{{ publishedAt }}公開</small>
    </div>
  </el-card>
</template>

<style scoped>
.published {
  color: darkgrey;
}
</style>
