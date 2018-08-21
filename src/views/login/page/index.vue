<template>
    <div>测试一下{{masg}}
      <el-col>{{date | parseTime('{y}-{m}-{d} {a} {h}:{i}:{s}')}}</el-col>
      <el-col>{{time | timeAgo}}</el-col>
    </div>
</template>

<script>
export default {
  data() {
    return {
      masg: 'nimei',
      date: Date.now(),
      time: 1534821065
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style>
</style>
