<template>
    <el-row class="layout-header" type="flex" align="middle">
        <!-- 先定义一行 -->
        <el-col class="left" :span="12">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col class="right" :span="12">
            <!-- justify 配置垂直排列方式 align 配置水平排列方式-->
            <el-row type="flex" justify="end" align="middle">
                <img src="../../assets/img/header.jpg" alt="">
                <!-- 下拉菜单 -->
                <el-dropdown>
                    <span class="el-dropdown-link">
                      江苏传智播客<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>Git地址</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
</el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 60px;
        .left {
            font-size: 20px;
            span {
                color: #2c3e50;
                font-size: 16px;
                margin-left: 4px;
            }
        }
        .right {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 5px;
            }
            .el-dropdown-link {
              cursor: pointer;
              color: #409EFF;
            }
            .el-icon-arrow-down {
              font-size: 12px;
            }
        }
    }
</style>
