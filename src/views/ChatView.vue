<script lang="ts" setup>
const AVATAR_URL =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
</script>

<template>
  <el-row style="min-height: calc(100vh - 57px)">
    <el-col :span="6" style="box-shadow: -6px 0 3px -3px #e6e8eb inset">
      <div class="chat-card">
        <el-row
          style="height: 100px; border: 1px solid #e6e8eb; cursor: pointer"
        >
          <el-col :span="6" class="flex-center"
            ><el-avatar :size="50" :src="AVATAR_URL"
          /></el-col>
          <el-col
            :span="15"
            style="
              flex-direction: column;
              display: flex;
              justify-content: space-evenly;
            "
          >
            <span style="font-size: 16px">物件名物件名</span>
            <span style="font-size: 12px">メッセージメッセージ...</span>
          </el-col>
          <el-col
            :span="3"
            style="
              flex-direction: column;
              display: flex;
              justify-content: space-evenly;
            "
          >
            <span style="font-size: 12px">1日前</span>
            <el-badge value="new" class="item"> </el-badge>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="18" style="background-color: red">
      <el-row style="flex-direction: column; height: 100%">
        <div style="background-color: #f4f4f5; height: 90%">チャット</div>
        <div
          style="
            background-color: #fafafa;
            height: 10%;
            box-shadow: 0 4px 3px -3px #e6e8eb inset;
          "
        >
          <el-form style="margin: 32px 32px">
            <el-input placeholder="メッセージそ入力" />
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
</style>
