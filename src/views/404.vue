<template>
  <div class="not-defined">
    <img src="@/assets/images/404.png" />

    <div class="content">
      <h3 class="title">页面未找到</h3>
      <span>抱歉！您访问的页面不存在，请返回上一级或点击下方按钮返回首页...</span>
    </div>

    <div class="btn" @click="$router.replace('/')">
      返回首页
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotDefined',
};
</script>

<style scoped>
.not-defined img {
  width: 100%;
  margin-top: 18%;
}

.content {
  padding: 0 1rem;
  font-size: 15px;
  color: #44405e;
  text-align: center;
}

.title {
  margin-bottom: 0.6rem;
  font-size: 20px;
  color: #302c48;
}

.btn {
  width: 2.4rem;
  padding: 0.16rem;
  padding: 10px;
  margin: 0 auto;
  margin-top: 1rem;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background-color: #ed8506;
  border-radius: 36px;
}
</style>
