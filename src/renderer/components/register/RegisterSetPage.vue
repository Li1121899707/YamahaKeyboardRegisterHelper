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
.center{
    text-align:center;
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
                    
                    <!--别删！！！！！！ <ButtonGroup size="large" style="zoom:120%">
                        <Button class="tooltip" v-for="item in buttons" :key="item.id" :disabled="item.disabled" :type="item.type" v-on:click="registerButtonChanges(item.text)">{{item.text}}
                            <span class="tooltiptext">音色：长笛+弦乐<br>节奏：8Beat</span>
                        </Button>
                    </ButtonGroup> -->
					<ButtonGroup size="large" style="zoom:120%">
                        <Button v-for="item in buttons" :key="item.id" :disabled="item.disabled" :type="item.type" v-on:click="registerButtonChanges(item.text)">{{item.text}}</Button>
                    </ButtonGroup>
                </Col>
                
                <Col span="2">
                    <Button type="success" v-on:click="register" :disabled="registerButtonDisabled">注册</Button>
                </Col>
            </Row>
        </Header>
        <!-- header 结束 -->
        <!-- 表单 开始 -->
        <Content :style="{margin: '30px 30px 30px 30px'}">
            
            <Row>
                <Col span="8">
                    <Card>
                        <p slot="title" class="center">音色 - Right1（右手一声部）</p>
                        <Table :columns="columns" height="220" :data="right1Data"></Table>
                    </Card>
                </Col>
                <Col span="8">
                    <Card v-if="doubleVoice == true">
                        <p slot="title">音色 - Right2（右手二声部）</p>
                        <Table :columns="columns" height="220" :data="right2Data"></Table>
                    </Card>
                    <Card v-else-if="doubleVoice == false" style="height:305px">
                        <div style="text-align:center;margin-top:100px">
                            <h3>未开启 双音色</h3>
                        </div>
                    </Card>
                </Col>
                <Col span="8">
                    <Card v-if="splitVoice == true">
                            <p slot="title" class="center">音色 - Left（左手声部）</p>
                        <Table :columns="columns" height="220" :data="leftData"></Table>
                    </Card>
                    <Card v-else-if="splitVoice == false" style="height:305px">
                        <div style="text-align:center; margin-top:100px">
                            <h3>未开启 分割键盘</h3>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Card v-if="useStyle == true">
                        <p slot="title" class="center">节奏</p>
                        <Table :columns="columns" height="220" :data="styleData"></Table>
                    </Card>
                    <Card v-else-if="useStyle == false" style="height:305px">
                        <div style="text-align:center;margin-top:100px" >
                            <h3>未使用 节奏</h3>
                        </div>
                    </Card>
                </Col>
                <Col span="12">
                    <Card style="height:305px">
                        <p slot="title" class="center">其他</p>
                    </Card>
                </Col>
            </Row>
            <Modal v-model="registerFirstModel" title="注册确认" @on-ok="registerFirstOk" @on-cancel="registerFirstCancel">
                <p>是否注册到序号 {{currButton}} ？</p>
            </Modal>
            <Modal v-model="registerOtherModel" title="注册确认" @on-ok="registerOtherOk" @on-cancel="registerOtherCancel">
                <p>您已经注册到序号 {{alreadyRegisterId}} 过了，是否还要继续注册？</p>
            </Modal>
            
        </div>
    </Card>
        </Content>
    </Layout>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
    export default {
        created(){
            this.findFromBankDatabase();
        },
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
                currButton: 1,
                alreadyRegisterId:[],
                registerFirstModel:false,
                registerOtherModel:false,
                registerButtonDisabled:false,
                bankDocs:''
            }  
        },
        methods: {
            findFromBankDatabase(){
                this.$db.bankData.loadDatabase();
                // 需要改成按条件查询！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                this.$db.bankData.find({},  (err, docs)=> {
                    this.bankDocs = docs;
                    console.log(this.bankDocs)
                    if(this.bankDocs.length != 0){
                        var buttonArr = this.bankDocs[0].registerId;
                        console.log(buttonArr)
                        if(buttonArr.length != 0){
                            for(var i = 0; i<buttonArr; i++){
                                this.buttons[buttonArr[i]-1].disabled = true;
                            }
                        }
                    }
                    this.registerButtonDisabledChanges();
                });
                
            },
            // 注册记忆更换响应
            registerButtonChanges(id){
                this.$Message.info('您选择了注册 ' + id);
                this.currButton = id;
                this.buttons.forEach(element => {
                    if(element.disabled == true)
                        return true; // 作用 = continue
                    else if(id == element.text) 
                        element.type = 'primary';
                    else
                        element.type = 'default';
                });
            },
            registerButtonDisabledChanges(){
                var search = false;
                for(var i = 0; i<this.buttons.length; i++){
                    if(this.buttons[i].disabled == false){
                        search = true;
                        this.registerButtonChanges(this.buttons[i].text);
                        break;
                    }
                }
                if(search == false){
                    this.registerButtonDisabled = true;
                }
            },
            dataCollation(data){
                var arr = [
                    {
                        'attribute':'音色名称',
                        'value':data.voiceName,
                    },
                    {
                        'attribute':'音色音量',
                        'value':data.voiceVolume,
                    },
                    {
                        'attribute':'延音',
                        'value':data.sustain?'开启':'关闭',
                    },
                    {
                        'attribute':'移调',
                        'value':data.octave,
                    },
                    {
                        'attribute':'力度',
                        'value':data.touch,
                    },
                    {
                        'attribute':'和声',
                        'value':data.harmony?'开启':'关闭',
                    },
                    {
                        'attribute':'和声类型',
                        'value':data.harmony?data.harmonyType:'——',
                    },
                    {
                        'attribute':'和声音量',
                        'value':data.harmony?data.harmonyVolume:'——',
                    },
                    {
                        'attribute':'dsp',
                        'value':data.dsp?'开启':'关闭',
                    },
                    {
                        'attribute':'dsp效果',
                        'value':data.dsp?data.dspType:'——',
                    }
                ];
                return arr;
            },
            register(){
                this.registerContent.registerId.push(this.currButton);
                if(this.alreadyRegisterId.length == 0)
                    this.registerFirstModel = true;
                else
                    this.registerOtherModel = true;
                this.$Message.info('将' + this.registerContent.generatedId + '注册至' + this.registerContent.registerId);
            },
            registerFirstOk(){
                this.$Message.info('registerFirstOk');
                this.alreadyRegisterId.push(this.currButton);
                this.buttons[this.currButton-1].disabled = true;
                this.registerButtonDisabledChanges();
            },
            registerFirstCancel(){
                this.$Message.info('registerFirstCancel');
            },
            registerOtherOk(){
                this.$Message.info('registerOtherOk');
                this.alreadyRegisterId.push(this.currButton);
                this.buttons[this.currButton-1].disabled = true;
                this.registerButtonDisabledChanges();
            },
            registerOtherCancel(){
                this.$Message.info('registerOtherCancel');
            }
        },
        computed: {
			// ...mapGetters(['registerContent']) ,// 动态计算属性，相当于this.$store.getters.resturantName
            // computed传参会破坏其属性，因此不传参数，用笨办法，将right1 right2 left 分开
            right1Data:function () {
                var temp = this.$store.getters.registerContent.voice.right1;
                return this.dataCollation(temp);
            },
            right2Data:function () {
                var temp = this.$store.getters.registerContent.voice.right2;
                return this.dataCollation(temp);
            },
            leftData:function () {
                var temp = this.$store.getters.registerContent.voice.left;
                return this.dataCollation(temp);
            },
            styleData:function () {
                var temp = this.$store.getters.registerContent.style;
                var arr = [
                    {
                        'attribute':'节奏名称',
                        'value':temp.styleName,
                    },
                    {
                        'attribute':'节奏音量',
                        'value':temp.styleVolume,
                    },
                    {
                        'attribute':'和弦',
                        'value':temp.acmp?'开启':'关闭',
                    },
                    {
                        'attribute':'同步启动',
                        'value':temp.syncStart?'开启':'关闭',
                    },
                    {
                        'attribute':'和弦分割点',
                        'value':temp.stylePoint,
                    },
                    {
                        'attribute':'节奏挡位',
                        'value':temp.mainType,
                    },
                    {
                        'attribute':'过门',
                        'value':temp.fillin?'开启':'关闭',
                    },
                    {
                        'attribute':'速度',
                        'value':temp.tempo,
                    },
                    {
                        'attribute':'前奏',
                        'value':temp.intro?'开启':'关闭',
                    },
                    {
                        'attribute':'前奏选择',
                        'value':temp.intro?temp.introType:'——',
                    },
                    {
                        'attribute':'淡入淡出',
                        'value':temp.fade?'开启':'关闭',
                    }
                ]
                return arr;
            },
            doubleVoice:function () {
                return this.$store.getters.registerContent.voice.doubleVoice;
            },
            splitVoice:function () {
                return this.$store.getters.registerContent.voice.splitVoice;
            },
            useStyle:function () {
                return this.$store.getters.registerContent.useStyle;
            },
            registerContent:function () {
                return this.$store.getters.registerContent;
            }
		}
    }
</script>