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
</style>

<template>
    <div slot="left" class="demo-split-pane">
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
                            <VoiceSettingPage></VoiceSettingPage>
                        </TabPane>
                        <!-- 右手一声部 结束 -->
                        <TabPane name="R2" label="Right2（右手二声部）" :disabled="right2Disabled">
                            <VoiceSettingPage></VoiceSettingPage>
                        </TabPane>
                        <TabPane name="L" label="Left（左手声部）" :disabled="leftDisabled">
                            <VoiceSettingPage></VoiceSettingPage>
                        </TabPane>
                    </Tabs>
                </p>
            </Panel>
            <Panel name="2">
                节奏
                <p slot="content">
                    <StyleSettingPage></StyleSettingPage>
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
    </div>

    
</template>
<script>
    import VoiceSettingPage from './VoiceSettingPage'
    import StyleSettingPage from './StyleSettingPage'
    export default {
        created(){
            
        },
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
            }
        }
    }
</script>