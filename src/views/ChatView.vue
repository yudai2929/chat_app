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
        <div style="background-color: #f4f4f5; height: 90%">
          <el-row
            justify="center"
            style="padding: 8px; border-bottom: 2px solid #e6e8eb"
            ><h2>物件名</h2></el-row
          >
          <div
            style="padding-left: 48px; padding-right: 48px; padding-top: 24px"
          >
            <el-row style="margin-bottom: 12px">
              <div
                style="display: flex; align-items: center; margin-right: 12px"
              >
                <el-avatar :size="30" :src="AVATAR_URL" />
              </div>

              <div
                style="display: flex; align-items: center; margin-right: 12px"
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
                  メッセージメッセージ...
                </p>
              </div>
              <div style="display: flex; align-items: end">
                <span style="font-size: 12px"> AM 9:00 </span>
              </div>
            </el-row>
            <el-row style="margin-bottom: 12px" justify="end">
              <div style="display: flex; align-items: end; margin-right: 12px">
                <span style="font-size: 12px"> AM 9:00 </span>
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
                  メッセージメッセージ...
                </p>
              </div>
            </el-row>
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
              <el-input placeholder="メッセージを入力" style="width: 90%" />
              <el-button
                type="primary"
                class="flex-center"
                style="margin-left: 24px"
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
</style>
