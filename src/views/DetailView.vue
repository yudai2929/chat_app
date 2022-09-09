<template>
  <div>
    {{ room?.websiteComment }}
  </div>
  <div>
    家賃
    {{ room?.contractCondition.price.amount }}円 / 共益費
    {{ room?.contractCondition.manageCost?.amount }}円
  </div>

  <div>
    {{ room?.salesPoint }}
  </div>
  <!--内見予約-->
  <div>
    <ElButton type="primary">内見予約</ElButton>
  </div>
  <!--部屋の詳細-->
  <div>
    {{ room?.specialityComment }},

    {{ room?.equipmentComment }}
  </div>

  <!--地図-->
  <div style="height: 400px; width: 80%">
    <l-map ref="map" :center="[35.68944, 139.69167]" :zoom="15" @ready="init">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
    </l-map>
  </div>
  <!---->
</template>

<!--地図を読み込む-->
<script lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
export default {
  components: {
    LMap,
    LTileLayer,
  },
};
</script>

<!--物件情報の取得-->
<script setup lang="ts">
import { ref } from 'vue';
import {
  Configuration,
  RentProperty,
  RentPropertyQueryAPIApi,
  BuildingQueryAPIApi,
  Building,
  BuildingPreview,
} from '@/dejima/property';
/*import {
  GetImageRentRentImgPropertyKeyFilenameGetRequest,
  ImageQueryAPIApi,
  Configuration as ImageConfiguration,
} from '@/dejima/image';*/
import { useRoute } from 'vue-router';
const route = useRoute();

// dejimaAPIクライアントを初期化
const rentPropertyQueryAPI = new RentPropertyQueryAPIApi(new Configuration());
const buildingQueryAPI = new BuildingQueryAPIApi(new Configuration());
//const ImageQueryAPI = new ImageQueryAPIApi(new ImageConfiguration());
// 検索結果を受け取る変数を用意。初期値は簡単のためとりあえず`null`にしておく
const room = ref<RentProperty | null>(null);
const build = ref<BuildingPreview | null>(null);
const id: string = route.params.id.toString();
console.log(`パスパラメータ：${id}`);
//クエリパラメータから物件IDを取得しbukkendetailに格納
const onSearch = async () => {
  room.value = await rentPropertyQueryAPI.getRentProperty({
    propertyFullKey: id,
  });
};
const onSearch2 = async () => {
  build.value = await buildingQueryAPI.getBuilding({
    buildingGuid: room.value.buildingGuid,
  });
};
onSearch();
/*
//物件の画像を取得
const figure = ref<Promise<object>>();
const onSearch = async () => {
  const response = ImageQueryAPI.bulkGetMetadataRentRentListGetRaw({
    propertyKey: route.params.id[0],
  });
  const figures: string[] = new Array(20);
  for (const item in response) {
    figures.push(item.url);
  }
};
*/
</script>

<style>
.sales {
  font-size: large;
}
</style>
