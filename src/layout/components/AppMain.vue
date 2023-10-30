<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
// 展开样式
export default {
  name: 'AppMain',
  components: {},
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
