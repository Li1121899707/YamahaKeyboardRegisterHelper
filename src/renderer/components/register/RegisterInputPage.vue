<style>
.cardLittle{
    height:52px
}
.demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
}
.demo-split-pane{
    padding: 10px;
}
.cardMid{
    height:66px
}
.colMid{
   padding:7px 0 0 0
}
.cardRow{
    padding:0 0 16px 0
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
    <Layout>
        <Header :style="{background: '#f8f8f9', height:'66px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Row style="font-size:16px">
                <Col offset="5" span="5">
                    <span style="margin:0 10px 0 0">键盘型号：</span>
                    <span style="margin:0 10px 0 0">{{keyboardType}}</span>
                </Col>
                
                <Col offset="4" span="6">
                    <span style="margin:0 10px 0 0">注册记忆库：</span>
                    <span style="margin:0 10px 0 0">{{bankName}}</span>
                </Col>
                
                <!-- <Col span="12">
                    <span style="margin:0 10px 0 0">注册记忆序列</span>
                    
                    <ButtonGroup size="large" style="zoom:120%">
                        <Button class="tooltip" v-for="item in buttons" :key="item.id" :disabled="item.disabled" :type="item.type" v-on:click="registerButtonChanges(item.text)">{{item.text}}
                            <span class="tooltiptext">音色：长笛+弦乐<br>节奏：8Beat</span>
                        </Button>
                    </ButtonGroup>
                </Col>
                
                <Col span="2">
                    <Button type="success">保存</Button>
                </Col> -->
            </Row>
        </Header>
        <!-- header 结束 -->
        <!-- 表单 开始 -->
        <Content :style="{margin: '30px 30px 30px 30px'}">
                <Collapse accordion  v-model="value1">
                    <Panel name="1">
                        音色
                        <p slot="content">
                            <!-- 双音色 & 分割键盘 开始 -->
                            <Row :gutter="16" class="cardRow">
                                <Col span="6">
                                    <!-- 双音色 卡片 开始 height:52px 实测固定值 -->
                                    <Card class="cardMid">
                                        <Col span="9" offset="3" class="colMid">
                                            <span>双音色</span>
                                        </Col>
                                        <Col span="12" class="colMid">
                                            <i-switch v-model="doubleSwitch" @on-change="changeDouble" />
                                        </Col>
                                    </Card>
                                    <!-- 双音色 卡片 结束 -->
                                </Col>
                                <Col span="6">
                                    <!-- 分割键盘 卡片 开始 -->
                                    <Card class="cardMid">
                                        <Col span="9" offset="3" class="colMid">
                                            <span>分割键盘</span>
                                        </Col>
                                        <Col span="12" class="colMid">
                                            <i-switch v-model="splitSwitch" @on-change="changeSplit" />
                                        </Col>
                                    </Card>
                                    <!-- 分割键盘 卡片 结束 -->
                                </Col>
                                <Col span="6">
                                    <Card class="cardMid">
                                        <Col span="9" offset="3" class="colMid">
                                            <span>分割点</span>
                                        </Col>
                                        <Col span="12">
                                            <Input v-model="splitPoint" type="number" placeholder="分割点" style="width: 70px" :disabled="splitPointDisabled" />
                                        </Col>
                                    </Card>
                                </Col>
                                <Col span="6">
                                    <Card class="cardMid">
                                        <Col span="17">
                                            <span>&nbsp;左手区同时为和弦区<br>(即STYLE+LEFT模式)</span>
                                        </Col>
                                        <Col span="7" class="colMid">
                                            <i-switch v-model="splitEqual" :disabled="splitEqualDisabled" />
                                        </Col>
                                    </Card>
                                </Col>
                            </Row>
                            <!-- 双音色 & 分割键盘 结束 -->
                            <!-- 必须用 v-model 双向绑定！！！不可使用:value="tabsVal"，这是单向绑定。会出现如：{当点击关闭分割键盘后，还会停留在Left界面}的情况 -->
                            <Tabs type="card" v-model="tabsVal">
                                <!-- 右手一声部 开始 -->
                                <TabPane name="R1" label="Right1（右手一声部）" style="height:338px">
                                    <VoiceSettingPage ref="right1Ref"></VoiceSettingPage>
                                </TabPane>
                                <!-- 右手一声部 结束 -->
                                <TabPane name="R2" label="Right2（右手二声部）" :disabled="right2Disabled">
                                    <VoiceSettingPage ref="right2Ref"></VoiceSettingPage>
                                </TabPane>
                                <TabPane name="L" label="Left（左手声部）" :disabled="leftDisabled">
                                    <VoiceSettingPage ref="right3Ref"></VoiceSettingPage>
                                </TabPane>
                            </Tabs>
                        </p>
                    </Panel>
                    <Panel name="2">
                        节奏
                        <p slot="content">
                            <StyleSettingPage ref="styleRef"></StyleSettingPage>
                        </p>        
                    </Panel>
                    <Panel name="3">
                        其他
                        <p slot="content">
                            <Row :gutter="16">
                                <Col span="8">
                                    <div>col-6</div>
                                </Col>
                                <Col span="8">
                                    <div>col-6</div>
                                </Col>
                                <Col span="8">
                                    <div>col-6</div>
                                </Col>
                            </Row>
                        </p>        
                    </Panel>
                </Collapse>
        </Content>
    </Layout>
</template>
<script>
    import VoiceSettingPage from './VoiceSettingPage'
    import StyleSettingPage from './StyleSettingPage'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        data () {
            return {
                value1: '1',
                doubleSwitch: false,
                splitSwitch: false,
                tabsVal: 'R1',
                splitPoint: '56',
                splitPointDisabled:true,
                splitEqualDisabled:true,
                right2Disabled:true,
                leftDisabled:true,
                rightDisable:false,
                splitEqual:true,
                keyboardTypeResult:'',
                bankNameResult:'',
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
                ]
            }  
        },
        components: { VoiceSettingPage,StyleSettingPage },
        methods: {
            changeSplit (status) {
                status ? this.$Message.info('分割键盘 : 开') : this.$Message.info('分割键盘 : 关');
                this.leftDisabled = !status;
                this.splitPointDisabled = !status;
                this.splitEqualDisabled = !status;
                this.tabsVal = "R1";
            },
            changeDouble (status) {
                status ? this.$Message.info('双音色 : 开') : this.$Message.info('双音色 : 关');
                this.right2Disabled = !status;
                this.tabsVal = "R1";
            },
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
            changeKeyboardType(){
                switch (this.keyboardTypeSelector) {
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
            },
            responseFunction(){
				var registerResult = this.registerContent;
				this.$store.dispatch('modifyRegisterContent',registerResult) // 修改store中的keyboard
			},
        },
        computed: {
			...mapGetters(['keyboardType']) ,// 动态计算属性，相当于this.$store.getters.resturantName
            ...mapGetters(['bankName']),
            registerContent:function () {
                var result = {
                    'generatedId':'name|&PSR-S670|&1',
                    'voice':{
                        'doubleVoice':this.doubleSwitch,
                        'splitVoice':this.splitSwitch,
                        'splitPoint':this.splitPoint,
                        'splitEqual':this.splitEqual,
                        'right1':this.$refs.right1Ref.voiceResult,
                        'right2':this.$refs.right2Ref.voiceResult,
                        'left':this.$refs.right3Ref.voiceResult,
                        'style':this.$refs.styleRef.styleResult
                    }
                }
                return result;
            }
		}
    }
</script>