<template>
  <el-card class="articles">
    <bread-crumb slot="header">
        <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
            <!-- 放置单选组 -->
            <!-- 第一种方法 监听组件的形式去做搜索 -->
            <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group> -->
            <el-radio-group v-model="searchForm.status">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
            <!-- 第一种方法 监听组件的形式去做搜索 -->
            <!-- <el-select placeholder="请选择频道" v-model="searchForm.channel_id" @change="changeCondition">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
            <!-- 日期选择器 日期范围 -->
            <!-- 第一种方法 监听组件的形式去做搜索 -->
            <!-- <el-date-picker @change="changeCondition" value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
            <el-date-picker value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
    </el-form>
    <el-row class="totle" type="flex" align="middle">
        <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <!-- 左侧 -->
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            <div class="info">
                <span>{{item.title}}</span>
                <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
                <span class="date">{{item.pubdate}}</span>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
            <span><el-button type="primary" icon="el-icon-edit" size="small">修改</el-button></span>
            <!-- 注册删除事件 -->
            <span @click="delMaterial(item.id)"><el-button type="primary" icon="el-icon-delete" size="small">删除</el-button></span>
        </div>
    </div>
    <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :currentPage-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage">
        </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 文章状态
      searchForm: {
        status: 5, // 默认选中全部
        channel_id: null, // 默认不选中任何一个分类
        dateRange: [] // 日期范围
      },
      channels: [], // 用来接收频道数据
      list: [],
      defaultImg: require('../../assets/img/de.jpg'), // 默认图片
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10 // 黑马头条的后台限制,故最低10条文章列表
      }
    }
  },
  watch: {
    searchForm: {
      handler: function () {
        // 执行handler数据已经变成最新的了
        // this指向组件实例
        this.changeCondition() // 直接调用条件改变方法
      },
      deep: true
    }
  },
  filters: {
    //   改变标签名称
    filterStatus (value) {
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // 改变标签颜色
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 删除文章方法
    delMaterial (id) {
      this.$confirm('是否要删除该文章?').then(() => {
        // 调用删除接口
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(result => {
          // 提示
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 重新拉取数据
          // this.page.currentPage = 1 // 根据业务 处理 如果删除了数据 是否回到第一页根据具体业务而定
          this.getConditionArticle()
        })
      })
    },
    //   改变页码方法
    changePage (newPage) {
      this.page.currentPage = newPage // 最新页码
      this.getConditionArticle() // 调用获取文章数据
    },
    //   改变条件
    changeCondition () {
      this.page.currentPage = 1 // 强制将页码重置第一页
      this.getConditionArticle() // 调用获取文章数据
    },
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 因为5是前端定义的一个标识, 如果等于5 表示查全部, 全部应该什么都不传 直接传null
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 开始时间
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null // 截止时间
      }
      this.getArticles(params)
    },
    // 获取所有频道
    getChannles () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表数据
        this.page.total = result.data.total_count // 总数
      })
    }
  },
  created () {
    this.getChannles() // 获取文章数据
    this.getArticles({ page: 1, per_page: 10 }) // 获取文章列表数据
  }
}
</script>

<style lang='less' scoped>
    .articles {
        .totle {
            height: 60px;
            border-bottom: 1px dashed #ccc;
        }
        .article-item {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px solid #f2f3f5;
            .left {
                display: flex;
                img {
                    width: 150px;
                    height: 150px;
                    border-radius: 4px;
                }
                .info {
                height: 100px;
                margin-left: 10px;
                display: flex;
                flex-direction: column; // 从上向下布局
                justify-content: space-around;
                .date {
                    font-size: 12px;
                    color: #999;
                }
                .tag {
                    text-align: center;
                    width: 60px;
                    }
                }
            }
            .right {
                span {
                    font-size: 14px;
                    margin-right:8px;
                    // cursor: pointer; // 修改鼠标样式为小手
                }
            }
        }
    }
</style>
