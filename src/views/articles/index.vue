<template>
  <el-card class="articles">
    <bread-crumb slot="header">
        <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
            <!-- 放置单选组 -->
            <el-radio-group v-model="searchForm.status">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
            <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                <!-- label显示值    value存储值 -->
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
            <!-- 日期选择器 日期范围 -->
            <el-date-picker v-model="searchForm.dataRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
    </el-form>
    <el-row class="totle" type="flex" align="middle">
        <span>共找到1000条符合条件的内容</span>
    </el-row>
    <div class="article-item">
        <!-- 左侧 -->
        <div class="left">
            <img src="../../assets/img/de.jpg" alt="">
            <div class="info">
                <span>哈哈哈哈哈哈哈哈哈哈哈</span>
                <el-tag class="tag">标签一</el-tag>
                <span class="date">2019</span>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
            <span><i class="el-icon-edit"></i>修改</span>
            <span><i class="el-icon-delete"></i>删除</span>
        </div>
    </div>
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
        dataRange: [] // 日期范围
      },
      channels: [] // 用来接收频道数据
    }
  },
  methods: {
    // 获取所有频道
    getChannles () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannles() // 获取文章数据
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
                    cursor: pointer; // 修改鼠标样式为小手
                }
            }
        }
    }
</style>
