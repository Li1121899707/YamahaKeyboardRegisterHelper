<template>
    <Layout>
        <Header :style="{background: '#fff', height:'66px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Row>
                <Col span="18">
                    <h1>注册记忆列表</h1>
                </Col>
                <Col offset="1" span="5">
                    <Button type="error" @click="clearAll">清空数据库</Button>
                </Col>
            </Row>
        </Header>
        <Card>
            <!-- <div>{{docs}}{{bankDosc}}</div> -->
            <!-- 绑定 panelId（数字，为下标）changePanel为执行函数，当点击折叠就会响应 -->
            <Collapse accordion  simple v-model="panelId" @on-change="changePanel(panelId)">
                <Panel v-for="item in bankDosc" :key="item._id" >
                    {{item.bankName}} —— {{item.keyboardType}}
                    <p slot="content">
                        <Row>
                            <Col offset="8">
                                <ButtonGroup size="large" style="zoom:120%">
                                    <Button v-for="item in buttons" :key="item.id" :disabled="item.disabled" :type="item.type" v-on:click="registerButtonChanges(item.text)">{{item.text}}</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Row style="margin-top:10px">
                            <Col offset="2" span="20">
                                    <div>
                                        <strong>序号 {{currButton}} 注册记忆信息:</strong>
                                        <br><br>
                                        <List border>
                                            <ListItem>
                                                <strong>音色:</strong>
                                                <div style="padding-left:10px" v-html="voiceResult"></div>
                                            </ListItem>
                                            <ListItem>
                                                <strong>节奏:</strong>
                                                <span style="padding-left:10px">{{styleResult}}</span>
                                            </ListItem>
                                            <ListItem>
                                                <strong>其他:</strong>
                                                <span style="padding-left:10px">{{otherResult}}</span>
                                            </ListItem>
                                        </List>
                                        <br>
                                    </div>
                            </Col>
                        </Row>
                    </p>
                </Panel>
            </Collapse>
        </Card>
    </Layout>
</template>
<script>
    export default {
        created(){
            this.findAllFromRegisterDatabase();
            this.findFromBankDatabase();
        },
        data () {
            return {
                current: 0,
                modal1: false,
                docs: '',
                bankDosc:'',
                buttons:[
                    {
                        id:'button1',
                        text:1,
                        type:'default',
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
                currButton: '',
                panelId:'',
                currBank:'',
                currKeyboardType:'',
                voiceResult:'',
                styleResult:'',
                otherResult:'空'
            }
        },
        methods: {
            appendVoiceStr(value){
                var result = '';
                result = result + " 音色音量:" + value.voiceVolume + "； ";
                result = result + (value.sustain?"延音开启；":"延音关闭；");
                result = result + "移调:" + value.octave + "；";
                result = result + "力度:" + value.touch + "；";
                result = result + (value.harmony?"和声开启；":"和声关闭；");
                if(value.harmony){
                    result = result + "和声类型:" + value.harmonyType + "；"
                    result = result + "和声音量:" + value.harmonyVolume + "；"
                }
                result = result + (value.dsp?"DSP开启；":"DSP关闭；");
                if(value.dsp)
                    result = result + "DSP类型:" + value.dspType + "；"
                return result;
            },
            appendStyleStr(value){
                var result = '';
                result = result + " 节奏名称:" + value.styleName + "； ";
                result = result + " 节奏音量:" + value.styleVolume + "； ";
                result = result + (value.acmp?"和弦开启；":"和弦关闭；");
                result = result + (value.syncStart?"同步启动开启；":"同步启动关闭；");
                result = result + "速度:" + value.tempo + "；";
                result = result + "主奏:" + value.mainType + "；";
                result = result + "和弦分割点:" + value.stylePoint + "；";
                result = result + (value.fillin?"过门开启；":"过门关闭；");
                result = result + (value.intro?"前奏开启；":"前奏关闭；");
                if(value.intro)
                    result = result + "前奏选择:" + value.introType + "；"
                result = result + (value.fade?"淡入/淡出开启；":"淡入/淡出关闭；");
                return result;
            },
            handleVoiceResult(arr){
                var resultStr = '';
                console.log(arr)
                if(arr.doubleVoice==true && arr.splitVoice == true){
                    resultStr = resultStr + "右侧使用了 " + arr.right1.voiceName + " 和 " + arr.right2.voiceName + "叠加的音色。";
                    resultStr = resultStr + "左侧使用了 " + arr.left.voiceName + " 音色分割。<br>";
                    resultStr = resultStr + arr.right1.voiceName +" 音色参数:" + this.appendVoiceStr(arr.right1) + "<br>";
                    resultStr = resultStr + arr.right2.voiceName +" 音色参数:" + this.appendVoiceStr(arr.right2) + "<br>";
                    resultStr = resultStr + arr.left.voiceName +" 音色参数:" + this.appendVoiceStr(arr.left);
                }
                else if(arr.doubleVoice==false && arr.splitVoice == true){
                    resultStr = resultStr + "使用了 " + arr.left.voiceName + " 音色分割。<br>";
                    resultStr = resultStr + arr.right1.voiceName +" 音色参数:"+ this.appendVoiceStr(arr.right1) + "<br>";
                    resultStr = resultStr + arr.left.voiceName +" 音色参数:"+ this.appendVoiceStr(arr.left);
                }
                else if(arr.doubleVoice==true && arr.splitVoice == false){
                    resultStr = resultStr + "使用了 " + arr.right1.voiceName + " 和 " + arr.right2.voiceName + " 叠加的音色。<br>";
                    resultStr = resultStr + arr.right1.voiceName +" 音色参数:" + this.appendVoiceStr(arr.right1) + "<br>";
                    resultStr = resultStr + arr.right2.voiceName +" 音色参数:" + this.appendVoiceStr(arr.right2) + "<br>";
                }
                else{
                    resultStr = resultStr + "使用了 " + arr.right1.voiceName + " 音色。<br>";
                    resultStr = resultStr + arr.right1.voiceName +" 音色参数:"+ this.appendVoiceStr(arr.right1);
                }
                this.voiceResult = resultStr;
            },
            handleStyleResult(useStyle, arr){
                if(!useStyle){
                    this.styleResult = '未使用节奏';
                    return 
                }
                this.styleResult = this.appendStyleStr(arr);
            },
            changePanel(id){
                if(id.length == 0)
                    return 
                this.currBank = this.bankDosc[id].bankName;
                this.currKeyboardType = this.bankDosc[id].keyboardType;
                var arr = this.bankDosc[id].registerId;
                this.buttons.forEach(element => {
                    var index = arr.indexOf(element.text)
                    if(index == -1)
                        element.disabled = true;
                });

            },
            // 查询特定 注册记忆库、琴型号、注册记忆序号的一条信息
            selectOneFromRegisterDatabase(){
                var name = this.currBank;
                var type = this.currKeyboardType;
                var id = this.currButton;
                this.$db.registerData.loadDatabase()
                this.$db.registerData.find({'bankName':name, 'keyboardType':type, 'registerId':id},  (err, docs)=> {
                    var success = true
                    if(docs.length == 0)
                        success = false
                    if(!success)
                        this.$Message.info('查询失败！系统错误！');
                    else{
                        var result = docs[0];
                        this.handleVoiceResult(result.voice);
                        this.handleStyleResult(result.useStyle, result.style);
                    }
                });
            },
            // 查询 所有注册记忆 信息
            findAllFromRegisterDatabase(){
                this.$db.registerData.loadDatabase();
                this.$db.registerData.find({},  (err, docs)=> {
                    this.docs = docs;
                });
            },
            // 查询 所有注册记忆库 信息
            findFromBankDatabase(){
                this.$db.bankData.loadDatabase();
                this.$db.bankData.find({},  (err, docs)=> {
                    this.bankDosc = docs;
                });
            },
            // 清空所有数据库
            clearAll(){
                this.$db.registerData.loadDatabase();
                this.$db.registerData.remove({}, { multi: true }, function (err, numRemoved) {
                });
                this.$db.bankData.loadDatabase();
                this.$db.bankData.remove({}, { multi: true }, function (err, numRemoved) {
                });
                this.findAllFromRegisterDatabase();
                this.findFromBankDatabase();
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
                this.selectOneFromRegisterDatabase();
            },
        },
        computed:{
            
        }
    }
</script>