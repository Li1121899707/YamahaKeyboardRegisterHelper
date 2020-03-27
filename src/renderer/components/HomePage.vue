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
        height: 80px;
        color: white;
        padding: 8px 10px;
        font-size:20px;
        text-align: center;
    }
    /* 组合按钮提示框（自定义CSS） */
    .tooltip {
        position: relative;
        display: inline-block;
        /* border-bottom: 1px dotted black; */
    }
    .tooltip .tooltiptext {
        visibility: hidden;
        width: 200px;
        height: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        top: 120%;
        left: 50%; 
        margin-left: -100px; 
        /* 定位 */
        position: absolute;
        z-index: 1;
        /* 淡入 opacity透明度由0-1 */
        opacity: 0;
        transition: all 0.6s ease-in-out;
        font-size: 14px;
    }
    .tooltip:hover .tooltiptext {
        /* 淡入 opacity透明度最高 */
        opacity: 0.7;
        visibility: visible;
        /* 延时显示 */
        transition-delay:1s;

    }
    .tooltip .tooltiptext::after {
        /* 加箭头 */
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black transparent;
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
                <Menu active-name="registerInputMenu" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="registerInputMenu">
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
            <Layout>
                <!-- header 开始 -->
                <Header :style="{background: '#f8f8f9', height:'80px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                    <Row :gutter="16">
                        <!-- 键盘型号 -->
                        <Col span="5" style="margin:10px">
                            <span style="margin:0 20px 0 0">键盘型号</span>
                            <Select v-model="unitSelector" style="width:120px" @on-change="changeUnitSelector">
                                <Option v-for="item in unitType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <!-- 注册记忆库 -->
                        <Col span="5" style="margin:10px">
                            <span style="margin:0 20px 0 0">注册记忆库</span>
                            <Select v-model="bankSelector" style="width:120px">
                                <Option v-for="item in bank" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <!-- 注册记忆序列 开始 -->
                        <Col span="12" style="margin:8px">
                            <span style="margin:0 20px 0 0">注册记忆序列</span>
                            <!-- 注册记忆序列 按钮组 -->
                            <ButtonGroup size="large" style="zoom:120%">
                               <Button class="tooltip" v-for="item in buttons" :key="item.id" :disabled="item.disabled" :type="item.type" v-on:click="registerButtonChanges(item.text)">{{item.text}}
                                    <span class="tooltiptext">音色：长笛+弦乐<br>节奏：8Beat</span>
                                </Button>
                            </ButtonGroup>
                        </Col>
                        <!-- 注册记忆序列 结束 -->
                    </Row>
                </Header>
                <!-- header 结束 -->
                <!-- 表单 开始 -->
                <Content :style="{margin: '30px 30px 30px 30px'}">
                    <div><RegisterInputPage></RegisterInputPage></div>
                </Content>
                <!-- 表单 结束 -->
            </Layout>
            <!-- 右侧内容 结束 -->
        </Layout>
    </div>
</template>
<script>
import RegisterInputPage from './RegisterInputPage'
    export default {
        data () {
            return {
                isShow:true,
                isCollapsed: false,
                unitType: [
                    {
                        value: 'PSR-S670',
                        label: 'PSR-S670'
                    },
                    {
                        value: 'KB-280',
                        label: 'KB-280'
                    },
                    {
                        value: 'KB-290',
                        label: 'KB-290'
                    },
                    {
                        value: 'KB-309',
                        label: 'KB-309'
                    }
                ],
                bank:[
                    {
                        value:"jixingqu",
                        label:"即兴曲"
                    },
                    {
                        value:"yangguang",
                        label:"阳光照耀着塔什库尔干"
                    }
                ],
                // 按钮
                buttons:[
                    {
                        id:'button1',
                        text:1,
                        type:'primary',
                        disabled:false
                    },{
                        id:'button2',
                        text:2,
                        type:'default',
                        disabled:false
                    },{
                        id:'button3',
                        text:3,
                        type:'default',
                        disabled:false
                    },
                    {
                        id:'button4',
                        text:4,
                        type:'default',
                        disabled:false
                    },
                    {
                        id:'button5',
                        text:5,
                        type:'default',
                        disabled:false
                    },
                    {
                        id:'button6',
                        text:6,
                        type:'default',
                        disabled:false
                    },
                    {
                        id:'button7',
                        text:7,
                        type:'dashed',
                        disabled:false
                    },
                    {
                        id:'button8',
                        text:8,
                        type:'dashed',
                        disabled:false
                    }
                ],
                unitSelector: 'PSR-S670',
                bankSelector: '',
                buttonOne: 'primary',
                buttonTwo: ''
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
        },
        methods:{
            // 注册记忆更换响应
            registerButtonChanges(id){
                this.$Message.info('您选择了注册 ' + id);
                this.buttons.forEach(element => {
                    if(element.disabled == true)
                        return true; // 作用 = continue
                    else if(id == element.text) 
                        element.type = 'primary';
                    else
                        element.type = 'default';
                });
            },
            // 切换键盘型号响应
            changeUnitSelector(){
                switch (this.unitSelector) {
                    case 'PSR-S670':
                        this.buttons.forEach(element => {
                            element.disabled = false;
                            if(element.text == 1)
                                element.type = 'primary';
                            else
                            element.type = 'default';
                        });
                        break;
                    case 'KB-280':
                    case 'KB-290':
                    case 'KB-309':
                        this.buttons.forEach(element => {
                            if(element.text == 1){
                                element.type = 'primary';
                                element.disabled = false;
                            }
                            else if(element.text < 5){
                                element.type = 'default';
                                element.disabled = false;
                            }
                            else{
                                element.type = 'dashed';
                                element.disabled = true;
                            }
                        });
                        break;
                    default:
                        break;
                }
            }
        },
    }
</script>