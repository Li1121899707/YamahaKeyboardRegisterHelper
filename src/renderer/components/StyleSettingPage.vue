<style>
.cardLittle{
    height:52px
}
.cardMid{
    height:66px
}
.cardMid2{
    height:70px
}
.colMid{
   padding:7px 0 0 0
}
.colMid2{
   padding:9px 0 0 0
}
.cardRow{
    padding:0 0 16px 0
}
</style>

<template>
<div>
    <!-- 节奏 和弦 同步启动 开始 -->
    <Row :gutter="16" class="cardRow">
        <!-- 节奏 Switch框 -->
        <Col span="6">
            <Card class="cardMid">
                <Col span="9" offset="3" class="colMid">
                    <span>使用节奏</span>
                </Col>
                <Col span="12" class="colMid">
                    <i-switch v-model="useStyleSwitch" @on-change="changeUseStyle" />
                </Col>
            </Card>
        </Col>
        <!-- 和弦 Switch框 -->
        <Col span="6">
            <Card class="cardMid">
                <Col span="9" offset="3" class="colMid">
                    <span>和弦</span>
                </Col>
                <Col span="12" class="colMid">
                    <i-switch v-model="acmpSwitch" @on-change="changeAcmp" :disabled="acmpSwitchDisabled" />
                </Col>
            </Card>
        </Col>
        <!-- 同步启动 Switch框 -->
        <Col span="6">
            <Card class="cardMid">
                <Col span="9" offset="3" class="colMid">
                    <span>同步启动</span>
                </Col>
                <Col span="12" class="colMid">
                    <i-switch v-model="syncStartSwitch" @on-change="changeSyncStart" :disabled="syncStartSwitchDisabled" />
                </Col>
            </Card>
        </Col>
        <!-- 分割点 Input框 -->
        <Col span="6">
            <Card class="cardMid">
                <Col span="9" offset="3" class="colMid">
                    <span>和弦分割点</span>
                </Col>
                <Col span="12">
                    <Input v-model="stylePoint" type="number" placeholder="分割点" style="width: 70px" :disabled="stylePointDisabled" />
                </Col>
            </Card>
        </Col>
    </Row>
    <!-- 节奏 和弦 同步启动 结束 -->


    <!-- 节奏名称 节奏音量  开始 -->
    <Row :gutter="16" class="cardRow">
        <!-- 节奏名称 Select框 -->
        <Col span="12">
            <Card class="cardMid">
                <Col span="6" offset="3" class="colMid">
                    <span>节奏名称</span>
                </Col>
                <Col span="15">
                    <Select v-model="styleNameSelect" style="width:200px" :disabled="styleNameSelectDisabled">
                        <Option v-for="item in styleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
            </Card>
        </Col>
        <!-- 节奏音量 Input框 -->
        <Col span="12">
            <Card class="cardMid">
                <Col span="6" offset="3" class="colMid">
                    <span>节奏音量</span>
                </Col>
                <Col span="15">
                    <Input v-model="styleVolume" type="number" placeholder="输入节奏音量（0-128）" style="width: 200px" :disabled="styleVolumeDisabled" />
                </Col>
            </Card>
        </Col>
    </Row>
    <!-- 音色名称 音色音量  结束 -->

    <!-- 节奏挡位 过门 速度 开始 -->
    <Row :gutter="16" class="cardRow">
        <!-- 挡位 Select框 -->
        <Col span="12">
            <Card class="cardMid2">
                <Col span="6" offset="3" class="colMid2">
                    <span>节奏挡位</span>
                </Col>
                <Col span="15">
                    <RadioGroup v-model="mainRadio" type="button" size="large">
                        <Radio value="mainA" label="A" :disabled="styleSelectADisabled"></Radio>
                        <Radio value="mainB" label="B" :disabled="styleSelectBDisabled"></Radio>
                        <Radio value="mainC" label="C" :disabled="styleSelectCDisabled"></Radio>
                        <Radio value="mainD" label="D" :disabled="styleSelectDDisabled"></Radio>
                    </RadioGroup>
                </Col>
            </Card>
        </Col>
        <!-- 过门 Switch框 -->
        <Col span="6">
            <Card class="cardMid2">
                <Col span="9" offset="3" class="colMid2">
                    <span>过门</span>
                </Col>
                <Col span="12" class="colMid">
                    <i-switch v-model="fillinSwitch" @on-change="changeFillin" :disabled="fillinSwitchDisabled" />
                </Col>
            </Card>
        </Col>
        <!-- 速度 Input框 -->
        <Col span="6">
            <Card class="cardMid2">
                <Col span="6" offset="3" class="colMid2">
                    <span>速度</span>
                </Col>
                <Col span="15">
                    <Input v-model="tempo" type="number" placeholder="（5-500）" style="width: 100px" :disabled="tempoDisabled"/>
                </Col>
            </Card>
        </Col>
    </Row>
    <!-- 节奏挡位 过门 速度 结束 -->

    <!-- 前奏 淡入/淡出 开始 -->
    <Row :gutter="16" class="cardRow">
        <!-- 前奏 Switch框 -->
        <Col span="6">
            <Card class="cardMid2">
                <Col span="9" offset="3" class="colMid2">
                    <span>前奏</span>
                </Col>
                <Col span="12" class="colMid">
                    <i-switch v-model="introSwitch" @on-change="changeIntro" :disabled="introSwitchDisabled"/>
                </Col>
            </Card>
        </Col>
        <!-- 前奏选择 Select框 -->
        <Col span="12">
            <Card class="cardMid2">
                <Col span="6" offset="3" class="colMid2">
                    <span>前奏选择</span>
                </Col>
                <Col span="15">
                    <RadioGroup v-model="introRadio" type="button" size="large">
                        <Radio value="introA" label="A" :disabled="introSelectDisabled"></Radio>
                        <Radio value="introb" label="B" :disabled="introSelectDisabled"></Radio>
                        <Radio value="introC" label="C" :disabled="introSelectDisabled"></Radio>
                    </RadioGroup>
                </Col>
            </Card>
        </Col>
        <!-- 淡入/淡出 Switch框 -->
        <Col span="6">
            <Card class="cardMid2">
                <Col span="9" offset="3" class="colMid2">
                    <span>淡入/淡出</span>
                </Col>
                <Col span="12" class="colMid">
                    <i-switch v-model="fadeSwitch" @on-change="changeFade" :disabled="fadeSwitchDisabled"/>
                </Col>
            </Card>
        </Col>
    </Row>
    <!-- 前奏 淡入/淡出 结束 -->
</div>

</template>
<script>
    export default {
        data () {
            return {
                useStyleSwitch: false,
                acmpSwitch: false,
                syncStartSwitch: false,
                fillinSwitch: false,
                introSwitch: false,
                fadeSwitch: false,
                introRadio: 'A',
                mainRadio: 'A',
                
                styleNameSelect: '',

                styleVolume: 100,
                tempo: 120,
                stylePoint: 56,
                styleList:[],
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    }
                ],
                
                acmpSwitchDisabled: true,
                syncStartSwitchDisabled:true,
                styleNameSelectDisabled:true,
                styleVolumeDisabled:true,
                fillinSwitchDisabled:true,
                tempoDisabled:true,
                introSwitchDisabled:true,
                introSelectDisabled:true,
                fadeSwitchDisabled:true,
                styleSelectADisabled:true,
                styleSelectBDisabled:true,
                styleSelectCDisabled:true,
                styleSelectDDisabled:true,
                stylePointDisabled:true
            }  
        },
        methods: {
            changeUseStyle (status) {
                status ? this.$Message.info('节奏 : 开') : this.$Message.info('节奏 : 关');
                this.acmpSwitchDisabled=!status;
                this.syncStartSwitchDisabled=!status;
                this.styleVolumeDisabled=!status;
                this.fillinSwitchDisabled=!status;
                this.tempoDisabled=!status;
                this.introSwitchDisabled=!status;
                this.fadeSwitchDisabled=!status;
                this.styleSelectADisabled=!status;
                this.styleSelectBDisabled=!status;
                this.styleSelectCDisabled=!status;
                this.styleSelectDDisabled=!status;
                this.styleNameSelectDisabled=!status;
                this.stylePointDisabled=!status;
                if(status == false)
                    this.introSelectDisabled=!status;
                else if(status == true && this.introSwitch == true)
                    this.introSelectDisabled=false;
            },
            changeAcmp (status) {
                status ? this.$Message.info('和弦 : 开') : this.$Message.info('和弦 : 关');
            },
            changeSyncStart (status) {
                status ? this.$Message.info('同步启动 : 开') : this.$Message.info('同步启动 : 关');
            },
            changeFillin (status) {
                status ? this.$Message.info('过门 : 开') : this.$Message.info('过门 : 关');
            },
            changeIntro (status) {
                status ? this.$Message.info('前奏 : 开') : this.$Message.info('前奏 : 关');
                this.introSelectDisabled=!status;
            },
            changeFade (status) {
                status ? this.$Message.info('淡入/淡出 : 开') : this.$Message.info('淡入/淡出 : 关');
            },
        }
    }
</script>