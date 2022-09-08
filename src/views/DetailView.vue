<template>
  <el-button>検索結果へ戻る</el-button>
  <!--タイトル-->
  <div class="title">
    {{ build?.buildingName }} {{ room?.dwellingUnit?.roomNumberText }}
  </div>
  <!--一押しコメント-->
  <div>
    {{ room?.websiteComment }}
  </div>
  <div class="container">
    <!--画像-->
    <el-carousel arrow="always" class="el-carousel">
      <el-carousel-item v-for="item in figure" :key="item.url">
        <el-image :src="item.url" class="el-carousel__item" />
      </el-carousel-item>
    </el-carousel>
    <div class="description">
      <!--家賃-->
      <div class="money">
        家賃
        {{ room?.contractCondition.price.amount }}円 / 共益費
        {{ room?.contractCondition.manageCost?.amount }}円
      </div>
      <!--敷金礼金-->
      <div class="money2">
        敷金
        <div
          v-if="(room?.contractCondition.repairCost?.amount || 0) > 0"
          class="nobreakline"
        >
          {{ room?.contractCondition.repairCost?.amount }}
        </div>
        <div v-else class="nobreakline">0</div>
        {{ room?.contractCondition.repairCost?.unit }}
        <br />
        礼金
        <div
          v-if="(room?.contractCondition.keyMoney?.amount || 0) > 0"
          class="nobreakline"
        >
          {{ room?.contractCondition.keyMoney?.amount }}
        </div>
        <div v-else class="nobreakline">0</div>
        {{ room?.contractCondition.keyMoney?.unit }}
      </div>
      <!--内見予約-->
      <div>
        <ElButton size="large" type="primary" class="naiken_button"
          >内見予約</ElButton
        >
      </div>
      <!--部屋の詳細-->
      <div>
        {{ room?.specialityComment }},

        {{ room?.equipmentComment }}
      </div>
    </div>
  </div>

  <!--{{ build }}-->
  {{ center }}
  <!--地図(非同期処理だと値を更新しても反映されない)-->
  <!--
  <div style="height: 400px; width: 100%">
    <l-map
      ref="map"
      :center="center"
      :zoom="15"
      @ready="init"
      @update:bounds="showBounds"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />
    </l-map>
  </div>-->
</template>

<script lang="ts">
import { LMap, LTileLayer, LControlLayers } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
  },
  data() {
    return {
      lat1: 0,
      lng1: 0,
      lat2: 0,
      lng2: 0,
    };
  },
  methods: {
    init() {
      const map = this.$refs.map.leafletObject;
      this.showBounds(map.getBounds());
    },
    showBounds(bounds) {
      const posNW = bounds.getNorthWest();
      const posSE = bounds.getSouthEast();
      this.lat1 = posNW.lat;
      this.lng1 = posNW.lng;
      this.lat2 = posSE.lat;
      this.lng2 = posSE.lng;
    },
    centerUpdated(center) {
      console.log('update:center fired');
      this.center = center;
    },
  },
};
</script>

<!--物件情報の取得-->
<script setup lang="ts">
import { ref, onBeforeUpdate } from 'vue';
import {
  Configuration,
  RentProperty,
  RentPropertyQueryAPIApi,
  BuildingQueryAPIApi,
  Building,
  BuildingPreview,
} from '@/dejima/property';
import {
  MetadataResponse,
  ImageQueryAPIApi,
  Configuration as ImageConfiguration,
} from '@/dejima/image';
import { useRoute } from 'vue-router';
const route = useRoute();

// dejimaAPIクライアントを初期化
const rentPropertyQueryAPI = new RentPropertyQueryAPIApi(new Configuration());
const buildingQueryAPI = new BuildingQueryAPIApi(new Configuration());
const ImageQueryAPI = new ImageQueryAPIApi(new ImageConfiguration());
// 検索結果を受け取る変数を用意。初期値は簡単のためとりあえず`null`にしておく
const room = ref<RentProperty | null>(null);
const build = ref<Building | null>(null);
const id: string = route.params.id.toString();
console.log(`パスパラメータ：${id}`);

//クエリパラメータから物件IDを取得しbukkendetailに格納
let lat: number;
let lon: number;
const center: number[] = new Array(2);
const projection = ref('EPSG:4326');
const zoom = ref(15);
const rotation = ref(0);

const getCenter = (build: Building) => {
  const jp_lat: number = (build.latitude || 0) / 3600000;
  const jp_lon: number = (build.longitude || 0) / 3600000;
  lat = jp_lat - jp_lat * 0.00010695 + jp_lon * 0.000017464 + 0.0046017;
  lon = jp_lon - jp_lat * 0.000046038 - jp_lon * 0.000083043 + 0.01004;
  center.push(lat);
  center.push(lon);
  center.splice(0, 2);
};
const onSearch = async () => {
  room.value = await rentPropertyQueryAPI.getRentProperty({
    propertyFullKey: id,
  });
  build.value = await buildingQueryAPI.getBuilding({
    buildingGuid: room.value?.buildingGuid || '',
  });
  await getCenter(build.value);
};
onSearch();

const figure = ref<MetadataResponse[] | null>(null);
//物件の画像を取得
//const figure = ref<Promise<object>>();
const onSearch2 = async () => {
  figure.value = await ImageQueryAPI.getMetadataRentRentPropertyKeyGet({
    propertyKey: id,
  });
  console.log(figure.value);
};
onSearch2();
</script>
<style>
.sales {
  font-size: large;
}
.title {
  font-size: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.nobreakline {
  display: inline-block;
}

.el-carousel {
  width: 200%;
  height: 400px;
  background-color: azure;
  display: inline-block;
}
.el-carousel__item el-image {
  color: #475669;
  margin: auto auto;
}

.container {
  display: flex;
  justify-content: center;
  padding: 30px 30px 30px 30px;
}

.description {
  margin-left: 50px;
}

.money {
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
}

.money2 {
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.naiken_button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
