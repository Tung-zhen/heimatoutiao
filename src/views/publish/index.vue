<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          发布文章
      </template>
      </bread-crumb>
      <!-- 容器 -->
      <el-form style="margin-left:50px" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="input" placeholder="文章标题" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="radio">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="2">三图</el-radio>
            <el-radio :label="3">无图</el-radio>
            <el-radio :label="4">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select></el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button plain>存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
