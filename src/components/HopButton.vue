<script setup lang="ts">
import { ref } from 'vue';

export type Props = {
  understand: string;
};

const props = withDefaults(defineProps<Props>(), {
  understand: 'Vue.js',
});

const praise = ref('');
const understand = () => {
  praise.value = `さすがだぞ！${props.understand}をばっちり理解したんだな！`;
};
</script>

<template>
  <ElRow justify="center">
    <ElButton @click="understand"> 褒める </ElButton>
    {{ praise }}
  </ElRow>
</template>
