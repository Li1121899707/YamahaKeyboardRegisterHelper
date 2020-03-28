<style scoped>
    /* 侧边栏 */
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 120px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        margin:14px 0 0 0;
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    /* 空白 */
    .blank{
        height: 66px;
        color: white;
        padding: 8px 10px;
        font-size:18px;
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <!-- 侧边栏 开始 -->
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <!-- 侧边栏 MENU 上方的空白 -->
                <div class="blank" v-if="isShow">YAMAHA<br>注册记忆助手</div>
                <div class="blank" v-if="!isShow">注册<br>记忆</div>
                <Menu active-name="hello" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="hello" to="/hello">
                        <Icon type="md-create"></Icon>
                        <span>使用手册</span>
                    </MenuItem>
                    <MenuItem name="registerInputMenu" to="/register-home">
                        <Icon type="md-create"></Icon>
                        <span>注册记忆信息录入</span>
                    </MenuItem>
                    <MenuItem name="registerViewMenu">
                        <Icon type="md-list-box"></Icon>
                        <span>注册记忆信息查看</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <!-- 侧边栏 结束 -->
            <!-- 右侧内容 开始 -->
            <router-view></router-view>
            <!-- 右侧内容 结束 -->
        </Layout>
    </div>
</template>
<script>
import RegisterInputPage from './register/RegisterInputPage'
    export default {
        data () {
            return {
                isShow:true,
                isCollapsed: false
            };
        },
        components: { RegisterInputPage },
        computed: {
            // 侧边栏闭合/展开
            menuitemClasses: function () {
                if(this.isCollapsed)
                    this.isShow = false;
                else
                    this.isShow = true;
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>