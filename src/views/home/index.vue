<template>
  <div>首页</div>
</template>

<script>
export default {
  name: '',
  components: {},
  filters: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    this.$post('/post')
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
