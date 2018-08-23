<template>
    <div>测试一下{{masg}}
      <el-col>{{date | parseTime('{y}-{m}-{d} {a} {h}:{i}:{s}')}}</el-col>
      <el-col>{{time | timeAgo}}</el-col>
    </div>
</template>

<script>
import http from '@/api/index.js'
export default {
  data() {
    return {
      masg: 'nimei',
      date: Date.now(),
      time: 1534821065
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const api = await http.GET('/health')
        console.log(api, 'api')
      } catch (error) {}
    }
  }
}
</script>

<style>
</style>
