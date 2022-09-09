<script lang="ts" setup>
import { useRooms } from '@/composables/useRooms';
import { useUser } from '@/composables/useUser';
import { db } from '@/plugins/firebase';
import { Message } from '@/types/Message';
import { Room } from '@/types/Room';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { ref, watch } from 'vue';
import { format } from 'date-fns';

const { rooms, loading } = useRooms();
const { user } = useUser();

const userId = user.value?.email ? user.value?.email : '';

const selectedRoom = ref<Room | null>();
const selectedRoomIndex = ref(0);
const text = ref<string | undefined>();

const onClickRoomCard = (room: Room, index: number) => {
  selectedRoom.value = room;
  selectedRoomIndex.value = index;
  console.log(room);
};

watch(rooms, () => {
  if (!rooms.value) return;
  selectedRoom.value = rooms.value[selectedRoomIndex.value];
});

const onSubmitMessage = async () => {
  if (!selectedRoom.value || !text.value) return;
  const docRef = doc(db, 'rooms', selectedRoom.value?.id);
  const newMessage: Message = {
    createAt: Timestamp.now(),
    postUser: userId,
    text: text.value,
    isRead: false,
  };
  console.log(newMessage);
  const messages: Message[] = selectedRoom.value.messages
    ? [...selectedRoom.value.messages, newMessage]
    : [newMessage];
  await updateDoc(docRef, {
    messages: messages,
  });
  text.value = '';
};
</script>

<template>
  <el-row
    v-loading.fullscreen.lock="loading"
    style="min-height: calc(100vh - 57px)"
  >
    <el-col :span="6" style="box-shadow: -6px 0 3px -3px #e6e8eb inset">
      <div
        v-for="(room, index) in rooms"
        :key="room.id"
        :class="selectedRoomIndex === index ? 'select-card' : ''"
        class="chat-card"
        @click="onClickRoomCard(room, index)"
      >
        <el-row
          style="height: 100px; border: 1px solid #e6e8eb; cursor: pointer"
        >
          <el-col :span="6" class="flex-center"
            ><el-avatar :size="50" :src="room.landlord.imageUrl"
          /></el-col>
          <el-col
            :span="15"
            style="
              flex-direction: column;
              display: flex;
              justify-content: space-evenly;
            "
          >
            <span style="font-size: 16px">{{
              room.landlord.buildingName
            }}</span>
            <span v-if="room.messages" style="font-size: 12px">{{
              room.messages[0].text
            }}</span>
          </el-col>
          <el-col
            :span="3"
            style="
              flex-direction: column;
              display: flex;
              justify-content: space-evenly;
            "
          >
            <span style="font-size: 12px">{{
              format(
                room.messages[room.messages.length - 1].createAt.toDate(),
                'M/d'
              )
            }}</span>
            <el-badge value="new" class="item"> </el-badge>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="18" style="background-color: red">
      <el-row style="flex-direction: column; height: 100%">
        <div style="background-color: #f4f4f5; height: 90%">
          <el-row
            justify="center"
            style="padding: 8px; border-bottom: 2px solid #e6e8eb"
            ><h2>{{ selectedRoom?.landlord.buildingName }}</h2></el-row
          >
          <div
            style="padding-left: 48px; padding-right: 48px; padding-top: 24px"
          >
            <div v-if="selectedRoom?.messages">
              <div
                v-for="(message, index) in selectedRoom.messages"
                :key="index"
              >
                <el-row
                  v-if="userId !== message.postUser"
                  style="margin-bottom: 12px"
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      margin-right: 12px;
                    "
                  >
                    <el-avatar
                      :size="30"
                      :src="selectedRoom?.landlord.imageUrl"
                    />
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      margin-right: 12px;
                    "
                  >
                    <p
                      style="
                        font-size: 12px;
                        background-color: #9bcdff;
                        padding: 12px;
                        color: #fff;
                        margin: 0;
                        border-radius: 12px;
                        border-bottom-left-radius: 0;
                      "
                    >
                      {{ message.text }}
                    </p>
                  </div>
                  <div style="display: flex; align-items: end">
                    <span style="font-size: 12px">
                      {{
                        format(message.createAt.toDate(), 'yyyy-MM-dd')
                      }}</span
                    >
                  </div>
                </el-row>
                <el-row v-else style="margin-bottom: 12px" justify="end">
                  <div
                    style="display: flex; align-items: end; margin-right: 12px"
                  >
                    <span style="font-size: 12px">
                      {{ format(message.createAt.toDate(), 'yyyy-MM-dd') }}
                    </span>
                  </div>
                  <div style="display: flex; align-items: center">
                    <p
                      style="
                        font-size: 12px;
                        background-color: #fff;
                        padding: 12px;
                        color: #303133;
                        margin: 0;
                        border-radius: 12px;
                        border-bottom-right-radius: 0;
                      "
                    >
                      {{ message.text }}
                    </p>
                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            background-color: #fafafa;
            height: 10%;
            box-shadow: 0 4px 3px -3px #e6e8eb inset;
          "
        >
          <el-form style="margin: 32px 32px">
            <el-row>
              <el-input
                v-model="text"
                placeholder="メッセージを入力"
                style="width: 90%"
              />
              <el-button
                v-if="text"
                type="primary"
                class="flex-center"
                style="margin-left: 24px"
                @click="onSubmitMessage"
              >
                <el-icon :size="25"><Promotion /></el-icon>
              </el-button>
              <el-button
                v-else
                type="primary"
                class="flex-center"
                style="margin-left: 24px"
                disabled
              >
                <el-icon :size="25"><Promotion /></el-icon>
              </el-button>
            </el-row>
          </el-form>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.chat-card :hover {
  background-color: #ecf5ff;
}
.select-card {
  background-color: #ecf5ff;
}
</style>

function useRooms(): { rooms: any; } { throw new Error("Function not
implemented."); }
