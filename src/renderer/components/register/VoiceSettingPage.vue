<style>
.cardLittle{
    height:52px
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
    <div>
        <!-- 音色名称 音色音量  开始(模板) -->
        <Row :gutter="16" class="cardRow">
            <Col span="12">
                <!-- 音色名称 卡片 开始 -->
                <Card class="cardMid">
                    <!-- 音色名称 开始 -->
                    <Col span="6" offset="3" class="colMid">
                        <span>音色名称</span>
                    </Col>
                    <!-- 音色名称 结束 -->
                    <!-- 音色名称 下拉框 开始 -->
                    <Col span="15">
                        <Select v-model="voiceListSelect" style="width:200px">
                            <Option v-for="item in voiceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <!-- 音色名称 下拉框 结束 -->
                </Card>
                <!-- 音色名称 卡片 结束 -->
            </Col>
            <Col span="12">
                <!-- 音色音量 卡片 开始 -->
                <Card class="cardMid">
                    <!-- 音色音量 开始 -->
                    <Col span="6" offset="3" class="colMid">
                        <span>音色音量</span>
                    </Col>
                    <!-- 音色音量 结束 -->
                    <!-- 音色音量 输入框 开始 -->
                    <Col span="15">
                        <Input v-model="voiceVolume" type="number" placeholder="输入音色音量（0-128）" style="width: 200px" />
                    </Col>
                    <!-- 音色音量 输入框 结束 -->
                </Card>
                    <!-- 音色音量 卡片 结束 -->
            </Col>
        </Row>
        <!-- 音色名称 音色音量  结束 -->

        <!-- 延音 移调 力度 开始 -->
        <Row :gutter="16" class="cardRow">
            <!-- 延音 -->
            <Col span="6">
                <Card class="cardMid">
                    <Col span="9" offset="3" class="colMid">
                        <span>延音</span>
                    </Col>
                    <Col span="12" class="colMid">
                        <i-switch v-model="sustainSwitch" @on-change="changeSustain" />
                    </Col>
                </Card>
            </Col>
            <!-- 移调 -->
            <Col span="9">
                <Card class="cardMid">
                    <Col span="6" offset="3" class="colMid">
                        <span>移调</span>
                    </Col>
                    <Col span="15">
                        <Select v-model="octaveSelect" style="width:150px">
                            <Option v-for="item in octaveList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Card>
            </Col>
            <!-- 力度 -->
            <Col span="9">
                    <Card class="cardMid">
                    <Col span="6" offset="3" class="colMid">
                        <span>力度</span>
                    </Col>
                    <Col span="15">
                        <Select v-model="touchSelect" style="width:150px">
                            <Option v-for="item in touchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Card>
            </Col>
        </Row>
        <!-- 延音 移调 力度 结束 -->

        <!-- 和声 开始 -->
        <Row :gutter="16" class="cardRow">
            <!-- 和声 -->
            <Col span="6">
                <Card class="cardMid">
                    <Col span="9" offset="3" class="colMid">
                        <span>和声</span>
                    </Col>
                    <Col span="12" class="colMid">
                        <i-switch v-model="harmonySwitch" @on-change="changeHarmony" />
                    </Col>
                </Card>
            </Col>
            <!-- 和声类型 -->
            <Col span="9">
                <Card class="cardMid">
                    <Col span="6" offset="3" class="colMid">
                        <span>和声类型</span>
                    </Col>
                    <Col span="15">
                        <Select v-model="harmonySelect" style="width:150px" placement="top" :disabled="harmonySelectDisabled">
                            <Option v-for="item in harmonyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Card>
            </Col>
            <!-- 和声音量 -->
            <Col span="9">
                <Card class="cardMid">
                    <Col span="6" offset="3" class="colMid">
                        <span>和声音量</span>
                    </Col>
                    <Col span="15">
                        <Input v-model="harmonyVolume" type="number" placeholder="输入音色音量（0-128）" style="width: 150px" :disabled="harmonyVolumeDisabled"/>
                    </Col>
                </Card>
            </Col>
        </Row>
        <!-- 和声 结束 -->

        <!-- DSP 开始 -->
        <Row :gutter="16" class="cardRow">
            <!-- DSP -->
            <Col span="6">
                <Card class="cardMid">
                    <Col span="9" offset="3" class="colMid">
                        <span>DSP</span>
                    </Col>
                    <Col span="12" class="colMid">
                        <i-switch v-model="dspSwitch" @on-change="changeDsp" />
                    </Col>
                </Card>
            </Col>
            <!-- DSP效果 -->
            <Col span="9">
                <Card class="cardMid">
                    <Col span="6" offset="3" class="colMid">
                        <span>DSP效果</span>
                    </Col>
                    <Col span="15">
                        <Select v-model="dspSelect" style="width:150px" placement="top" :disabled="dspSelectDisabled">
                            <Option v-for="item in dspList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Card>
            </Col>
        </Row>
        <!-- DSP 结束 -->
    </div>
</template>
<script>
    export default {
        // 被绑定的变量
        data () {
            return {
                right2Disabled:true,
                leftDisabled:true,
                harmonySelectDisabled:true,
                harmonyVolumeDisabled:true,
                dspSelectDisabled:true,
                voiceVolume: 100,
                harmonyVolume: 100,
                sustainSwitch: false,
                harmonySwitch: false,
                voiceListSelect: '',
                octaveSelect: 0,
                touchSelect: 'HARD 1',
                harmonySelect: 'Standard Duet',
                dspSwitch:false,
                dspSelect: 'Standard',
                voiceList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    }
                ],
                octaveList:[
                    {
                        value:0,
                        label:"0"
                    },
                    {
                        value:1,
                        label:"1"
                    },
                    {
                        value: -1,
                        label:"-1"
                    }
                ],
                touchList:[
                    {
                        value:'HARD 2',
                        label:"HARD 2"
                    },
                    {
                        value:'HARD 1',
                        label:"HARD 1"
                    },
                    {
                        value:'MEDIUM',
                        label:'MEDIUM'
                    },
                    {
                        value:'SOFT 1',
                        label:'SOFT 1'
                    },
                    {
                        value:'SOFT 2',
                        label:'SOFT 2'
                    },
                    {
                        value:'OFF',
                        label:'OFF'
                    }
                ],
                harmonyList:[
                    {
                        value:'Standard Duet',
                        label:"Standard Duet"
                    },
                    {
                        value:'Standard Trio',
                        label:"Standard Trio"
                    },
                    {
                        value:'Full Chord',
                        label:"Full Chord"
                    },
                    {
                        value:'Rock Duet',
                        label:"Rock Duet"
                    },
                    {
                        value:'Country Duet',
                        label:"Country Duet"
                    },
                    {
                        value:'Country Trio',
                        label:"Country Trio"
                    },
                    {
                        value:'Block',
                        label:"Block"
                    },
                    {
                        value:'4-Way Close1',
                        label:"4-Way Close1"
                    },
                    {
                        value:'4-Way Close2',
                        label:"4-Way Close2"
                    },
                    {
                        value:'4-Way Open',
                        label:"4-Way Open"
                    },
                    {
                        value:'1+5',
                        label:"1+5"
                    },
                    {
                        value:'Octave',
                        label:"Octave"
                    },
                    {
                        value:'Strum',
                        label:"Strum"
                    },
                    {
                        value:'Multi Assign',
                        label:"Multi Assign"
                    }
                ],
                dspList:[
                    {
                        value:'Standard',
                        label:"Standard"
                    },
                ],
                
            }  
        },
        methods: {
            changeSustain (status) {
                status ? this.$Message.info('延音 : 开') : this.$Message.info('延音 : 关');
            },
            changeHarmony (status) {
                status ? this.$Message.info('和声 : 开') : this.$Message.info('和声 : 关');
                this.harmonySelectDisabled = !status;
                this.harmonyVolumeDisabled = !status; 
            },
            changeDsp (status) {
                status ? this.$Message.info('Dsp : 开') : this.$Message.info('Dsp : 关');
                this.dspSelectDisabled = !status; 
            },
        },
        computed:{
            voiceResult:function () {
                var temp = {
                    'voiceName':this.voiceListSelect,
                    'voiceVolume':this.voiceVolume,
                    'sustain':this.sustainSwitch,
                    'octave':this.octaveSelect,
                    'touch':this.touchSelect,
                    'harmony':this.harmonySwitch,
                    'harmonyType':this.harmonySwitch?this.harmonySelect:null,
                    'harmonyVolume':this.harmonySwitch?this.harmonyVolume:null,
                    'dsp':this.dspSwitch,
                    'dspType':this.dspSwitch?this.dspSelect:null
                }
                return temp;
            }
        }
    }
</script>