<template>
    <div class="name">测试一下{{masg}}
      <el-col>{{date | parseTime('{y}-{m}-{d} {a} {h}:{i}:{s}')}}</el-col>
      <el-col>{{time | timeAgo}}</el-col>
      <iframe src="./a.html"></iframe>
    </div>
</template>

<script>
import $aa from 'jquery'
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
        console.log(12312312)
        const a = $aa('.name')
        console.log(a)
        const api = await http.GET('/health')
      } catch (error) {}
    }
  }
}
</script>

<style>
</style>
