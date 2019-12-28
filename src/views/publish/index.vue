<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          发布文章
      </template>
      </bread-crumb>
      <!-- 容器 -->
      <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="文章标题" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="formData.content">
          </el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-radio-group v-model="formData.cover.type">
            <!-- 封面类型 -1:自动,0-无图,1-1张,3-3张 -->
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select  v-model="formData.channel_id">
            <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="publishArticle" type="primary">发表</el-button>
          <el-button @click="publishArticle" plain>存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 用来接收频道数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动,0-无图,1-1张,3-3张
          images: [] // 放置封面地址的数组
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 校验规则 title/content/channel_id 都是必填项
        title: [{ required: true, message: '文章标题不能为空' },
          { min: 5, max: 30, message: '标题的长度在5-30个字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
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
    },
    // 发布文章
    publishArticle () {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          console.log('校验通过')
        }
      })
    }
  },
  created () {
    this.getChannles() // 调用获取频道数据的方法
  }
}
</script>

<style>

</style>
