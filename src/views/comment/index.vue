<template>
  <!-- 卡片组件 -->
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- el-table -->
    <!-- 表格 -->
    <el-table :data="list">
      <!-- 放置列组件 width 宽度 label 表头  prop 字段名 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrCloseState(obj.row)"
          >{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
        </template>
      </el-table-column>
      <!-- Pagination 分页组件 -->
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <!-- total 总页数 -->
      <el-pagination background layout="prev, pager, next" @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
// import { runMain } from 'module'
export default {
  data () {
    return {
      list: [], // 定义一个数据接收返回结果
      loading: false, // 默认不打开加载
      // page 专门存放分页信息数据
      page: {
        total: 0, // 总条目数 类型为number
        pageSize: 10, // 每页显示条目个数 类型为number  默认每页条数为10
        currentPage: 1 // 当前页数  类型为number  默认页码为1
      }
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 最新的页码
      this.getComment() // 重新请求
    },
    getComment () {
      this.loading = true // 打开加载组件
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取文章总数
        this.loading = false
        // setTimeout(() => {
        //   this.loading = false
        // }, 200)
      })
    },
    // 定义格式化函数
    formatterBoolean (row, column, cellValue, index) {
      // row 当前行数据
      // column 当前列信息
      // cellValue  当前单元格的值
      // index  索引
      return cellValue ? '正常' : '关闭' // 根据cellValue返回  评论状态
    },
    // 打开或关闭评论
    openOrCloseState (row) {
      // 直接调用接口
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否确定要${mess}评论吗`, '提示').then(() => {
        // 调用接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 因为当前如果是打开 ,就要关闭 如果是关闭 就要打开
        }).then(result => {
          //  表示执行成功
          this.getComment() // 重新拉取评论管理数据
        })
      })
    }
  },
  created () {
    this.getComment() // 获取数据
  }
}
</script>

<style>
</style>
