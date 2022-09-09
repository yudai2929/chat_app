<template>
  <router-link to="/">
    <el-button>検索画面へ戻る</el-button>
  </router-link>
  <!--タイトル-->
  <div class="title">
    {{ build?.buildingName }} {{ room?.dwellingUnit?.roomNumberText }}
  </div>
  <!--一押しコメント-->
  <div class="comment">
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
        {{ room?.contractCondition.price.amount / 10000 }}万円 <br />
        <div class="kyoeki">
          共益費 {{ room?.contractCondition.manageCost?.amount }}円
        </div>
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
        <el-button v-loading.fullscreen.lock="loading" @click="onClickApply">
          内見を申し込む
        </el-button>
      </div>

      <!--部屋の詳細-->
      <el-descriptions title="詳細情報" direction="vertical" :column="3" border>
        <el-descriptions-item label="レイアウト">
          {{ room?.dwellingUnit?.layoutText }}
        </el-descriptions-item>
        <el-descriptions-item label="構造">
          {{ build?.structure }}
        </el-descriptions-item>
        <el-descriptions-item label="楽器演奏">{{
          room?.contractCondition.musicalInstrumentRestriction
        }}</el-descriptions-item>
        <el-descriptions-item label="ガス">
          {{ room?.gas }}</el-descriptions-item
        >

        <el-descriptions-item label="最寄駅">
          {{ room?.transportation[0].station?.lineName }}
          {{ room?.transportation[0].station?.stationName }}駅
          {{ room?.transportation[0].wayTo }}
          {{ room?.transportation[0].stationAccess?.value }}
          {{ room?.transportation[0].stationAccess?.unit }}
        </el-descriptions-item>
        <el-descriptions-item label="住所"
          >{{ build?.addressText
          }}{{ build?.branchNumberText }}</el-descriptions-item
        >
        <el-descriptions-item label="現状">{{
          room?.currentStatus
        }}</el-descriptions-item>
      </el-descriptions>
      その他
      <div class="other">
        {{ room?.specialityComment }},

        {{ room?.equipmentComment }}
      </div>
    </div>
  </div>
</template>

<!--
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
-->

<!--物件情報の取得-->
<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Configuration,
  RentProperty,
  RentPropertyQueryAPIApi,
  BuildingQueryAPIApi,
  Building,
  AgentQueryAPIApi,
  Agent,
} from '@/dejima/property';
import {
  MetadataResponse,
  ImageQueryAPIApi,
  Configuration as ImageConfiguration,
} from '@/dejima/image';
import { useRoute } from 'vue-router';
import { useProfile } from '@/composables/useProfile';
import { useUser } from '@/composables/useUser';
import { db } from '@/plugins/firebase';
import { Message } from '@/types/Message';
import { RequestRoom } from '@/types/req/RequestRoom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'vue-router';
const route = useRoute();

// dejimaAPIクライアントを初期化
const rentPropertyQueryAPI = new RentPropertyQueryAPIApi(new Configuration());
const buildingQueryAPI = new BuildingQueryAPIApi(new Configuration());
const ImageQueryAPI = new ImageQueryAPIApi(new ImageConfiguration());
const AgentQueryAPI = new AgentQueryAPIApi(new Configuration());
// 検索結果を受け取る変数を用意。初期値は簡単のためとりあえず`null`にしておく
const room = ref<RentProperty | null>(null);
const build = ref<Building | null>(null);
const agent = ref<Agent | null>(null);
const id: string = route.params.id.toString();
console.log(`パスパラメータ：${id}`);

//クエリパラメータから物件IDを取得しbukkendetailに格納
let lat: number;
let lon: number;
const center: number[] = new Array(2);
const projection = ref('EPSG:4326');
const zoom = ref(15);
const rotation = ref(0);

/*
const getCenter = (build: Building) => {
  const jp_lat: number = (build.latitude || 0) / 3600000;
  const jp_lon: number = (build.longitude || 0) / 3600000;
  lat = jp_lat - jp_lat * 0.00010695 + jp_lon * 0.000017464 + 0.0046017;
  lon = jp_lon - jp_lat * 0.000046038 - jp_lon * 0.000083043 + 0.01004;
  center.push(lat);
  center.push(lon);
  center.splice(0, 2);
};*/
const roomSearch = async () => {
  room.value = await rentPropertyQueryAPI.getRentProperty({
    propertyFullKey: id,
  });
  build.value = await buildingQueryAPI.getBuilding({
    buildingGuid: room.value?.buildingGuid || '',
  });
  agent.value = await AgentQueryAPI.getAgentByCustomerKey({
    agentIdentifier: room.value.customerKey,
  });
};
roomSearch();

const figure = ref<MetadataResponse[] | null>(null);
//物件の画像を取得
//const figure = ref<Promise<object>>();
const roomFigureSearch = async () => {
  figure.value = await ImageQueryAPI.getMetadataRentRentPropertyKeyGet({
    propertyKey: id,
  });
  console.log(figure.value);
};
roomFigureSearch();

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
    buildingName:
      (build.value?.buildingName || '') +
      (room.value?.dwellingUnit?.roomNumberText || '') +
      '/' +
      agent.value?.agentShopName,
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
  margin-bottom: 10px;
}

.money2 {
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.naiken_button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.other {
  font-size: 10px;
}

.kyoeki {
  font-size: 80%;
}
</style>
