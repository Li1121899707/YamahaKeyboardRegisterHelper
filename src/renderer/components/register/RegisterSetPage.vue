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
                <Col span="5">
                    <span>键盘型号:</span>
                    <span>PSR-S670</span>
                </Col>
                
                <Col span="5">
                    <span>注册记忆库:</span>
                    <span>即兴曲</span>
                </Col>
                
                <Col span="12">
                    <span style="margin:0 10px 0 0">注册记忆序列</span>
                    
                    <!-- <ButtonGroup size="large" style="zoom:120%">
                        <Button class="tooltip" v-for="item in buttons" :key="item.id" :disabled="item.disabled" :type="item.type" v-on:click="registerButtonChanges(item.text)">{{item.text}}
                            <span class="tooltiptext">音色：长笛+弦乐<br>节奏：8Beat</span>
                        </Button>
                    </ButtonGroup> -->
					<ButtonGroup size="large" style="zoom:120%">
                        <Button v-for="item in buttons" :key="item.id" :disabled="item.disabled" :type="item.type" v-on:click="registerButtonChanges(item.text)">{{item.text}}</Button>
                    </ButtonGroup>
                </Col>
                
                <Col span="2">
                    <Button type="success">选择</Button>
                </Col>
            </Row>
        </Header>
        <!-- header 结束 -->
        <!-- 表单 开始 -->
        <Content :style="{margin: '30px 30px 30px 30px'}">
            
            <Row>
                <Col span="8">
                    <Card>
                        <p slot="title">音色 - Right1（右手一声部）</p>
                        <Table :columns="columns" height="220" :data="right1Data"></Table>
                    </Card>
                </Col>
                <Col span="8">
                    <Card>
                        <p slot="title">音色 - Right2（右手二声部）</p>
                        <Table :columns="columns" height="220" :data="right2Data"></Table>
                    </Card>
                </Col>
                <Col span="8">
                    <Card>
                        <p slot="title">音色 - Left（左手声部）</p>
                        <Table :columns="columns" height="220" :data="leftData"></Table>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Card>
                        <p slot="title">节奏</p>
                        <Table :columns="columns" height="220" :data="styleData"></Table>
                    </Card>
                </Col>
                <Col span="12">
                    <Card>
                        <p slot="title">其他</p>
                        <!-- <Table :columns="columns" height="220" :data=""></Table> -->
                    </Card>
                </Col>
            </Row>
            
            
        </div>
    </Card>
        </Content>
    </Layout>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
    export default {
        data () {
            return {
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
                columns: [
                    {
                        title: '属性',
                        key: 'attribute'
                    },
                    {
                        title: '值',
                        key: 'value'
                    }
                ],
            }  
        },
        methods: {
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
        },
        computed: {
			// ...mapGetters(['registerContent']) ,// 动态计算属性，相当于this.$store.getters.resturantName
            right1Data:function () {
                var temp = this.$store.getters.registerContent;
                var arr = [
                    {
                        'attribute':'音色名称',
                        'value':temp.voice.right1.voiceName,
                    },
                    {
                        'attribute':'音色音量',
                        'value':temp.voice.right1.voiceVolume,
                    },
                    {
                        'attribute':'延音',
                        'value':temp.voice.right1.sustain,
                    },
                    {
                        'attribute':'移调',
                        'value':temp.voice.right1.octave,
                    },
                    {
                        'attribute':'力度',
                        'value':temp.voice.right1.touch,
                    },
                    {
                        'attribute':'和声',
                        'value':temp.voice.right1.harmony,
                    },
                    {
                        'attribute':'和声类型',
                        'value':temp.voice.right1.harmony?temp.voice.right1.harmonyType:'',
                    },
                    {
                        'attribute':'和声音量',
                        'value':temp.voice.right1.harmony?temp.voice.right1.harmonyVolume:'',
                    },
                    {
                        'attribute':'dsp',
                        'value':temp.voice.right1.dsp,
                    },
                    {
                        'attribute':'dsp效果',
                        'value':temp.voice.right1.dsp?temp.voice.right1.dspType:'',
                    }
                ]
                return arr;
            },
            right2Data:function () {
                var temp = this.$store.getters.registerContent;
                var arr = [
                    {
                        'attribute':'音色名称',
                        'value':temp.voice.right2.voiceName,
                    },
                    {
                        'attribute':'音色音量',
                        'value':temp.voice.right2.voiceVolume,
                    },
                    {
                        'attribute':'延音',
                        'value':temp.voice.right2.sustain,
                    },
                    {
                        'attribute':'移调',
                        'value':temp.voice.right2.octave,
                    },
                    {
                        'attribute':'力度',
                        'value':temp.voice.right2.touch,
                    },
                    {
                        'attribute':'和声',
                        'value':temp.voice.right2.harmony,
                    },
                    {
                        'attribute':'和声类型',
                        'value':temp.voice.right2.harmony?temp.voice.right2.harmonyType:'',
                    },
                    {
                        'attribute':'和声音量',
                        'value':temp.voice.right2.harmony?temp.voice.right2.harmonyVolume:'',
                    },
                    {
                        'attribute':'dsp',
                        'value':temp.voice.right2.dsp,
                    },
                    {
                        'attribute':'dsp效果',
                        'value':temp.voice.right2.dsp?temp.voice.right2.dspType:'',
                    }
                ]
                return arr;
            },
            leftData:function () {
                var temp = this.$store.getters.registerContent;
                var arr = [
                    {
                        'attribute':'音色名称',
                        'value':temp.voice.left.voiceName,
                    },
                    {
                        'attribute':'音色音量',
                        'value':temp.voice.left.voiceVolume,
                    },
                    {
                        'attribute':'延音',
                        'value':temp.voice.left.sustain,
                    },
                    {
                        'attribute':'移调',
                        'value':temp.voice.left.octave,
                    },
                    {
                        'attribute':'力度',
                        'value':temp.voice.left.touch,
                    },
                    {
                        'attribute':'和声',
                        'value':temp.voice.left.harmony,
                    },
                    {
                        'attribute':'和声类型',
                        'value':temp.voice.left.harmony?temp.voice.left.harmonyType:'',
                    },
                    {
                        'attribute':'和声音量',
                        'value':temp.voice.left.harmony?temp.voice.left.harmonyVolume:'',
                    },
                    {
                        'attribute':'dsp',
                        'value':temp.voice.left.dsp,
                    },
                    {
                        'attribute':'dsp效果',
                        'value':temp.voice.left.dsp?temp.voice.left.dspType:'',
                    }
                ]
                return arr;
            },
            styleData:function () {
                var temp = this.$store.getters.registerContent;
                var arr = [
                    {
                        'attribute':'和弦',
                        'value':temp.voice.style.acmp,
                    },
                    {
                        'attribute':'同步启动',
                        'value':temp.voice.style.syncStart,
                    },
                    {
                        'attribute':'和弦分割点',
                        'value':temp.voice.style.stylePoint,
                    },
                    {
                        'attribute':'节奏名称',
                        'value':temp.voice.style.styleName,
                    },
                    {
                        'attribute':'节奏音量',
                        'value':temp.voice.style.styleVolume,
                    },
                    {
                        'attribute':'节奏挡位',
                        'value':temp.voice.style.mainType,
                    },
                    {
                        'attribute':'过门',
                        'value':temp.voice.style.fillin,
                    },
                    {
                        'attribute':'速度',
                        'value':temp.voice.style.tempo,
                    },
                    {
                        'attribute':'前奏',
                        'value':temp.voice.style.intro,
                    },
                    {
                        'attribute':'前奏选择',
                        'value':temp.voice.style.introType,
                    },
                    {
                        'attribute':'淡入淡出',
                        'value':temp.voice.style.fade,
                    }
                ]
                return arr;
            }
		}
    }
</script>