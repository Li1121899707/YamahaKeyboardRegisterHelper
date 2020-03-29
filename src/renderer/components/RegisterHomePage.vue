<template>
    <Layout>
        <Header :style="{background: '#fff', height:'66px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Row>
                <Col span="18" style="margin:20px 0">
                    <Steps :current="current">
                        <Step title="选择琴型号和注册记忆库"></Step>
                        <Step title="录入注册记忆信息"></Step>
                        <Step title="选择注册记忆序号"></Step>
                        <Step title="完成"></Step>
                    </Steps>
                </Col>
                <Col offset="1" span="5">
                 <ButtonGroup shape="circle">
                    <Button type="primary"  @click="back">
                        <Icon type="ios-arrow-back"></Icon>
                        上一步
                    </Button>
                    <Button type="primary" @click="next">
                        下一步
                        <Icon type="ios-arrow-forward"></Icon>
                    </Button>
                </ButtonGroup>
                </Col>
            </Row>
        </Header>
        <Modal v-model="modal1" title="⚠回退警告⚠" @on-ok="ok" @on-cancel="cancel">
                    <p>返回上一步不会保存您已经输入的信息！！！</p>
                    <p>返回上一步不会保存您已经输入的信息！！！</p>
                    <p>返回上一步不会保存您已经输入的信息！！！</p>
                    <br>
                    <p>如果【确实需要返回上一步】，请点击【确定】</p>
        </Modal>
        <!-- router -->
        <router-view ref='target-name'></router-view>
    </Layout>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
    export default {
        created: function () {
            this.$router.push({ path: 'register-bank' })
        },
        data () {
            return {
                current: 0,
                modal1: false,
                ids:[],
                bankDoc: '',
            }
        },
        methods: {
            insertRegisterData(){
                var arr = this.registerContent.registerId
                for(var i=0; i<arr.length; i++)
                    this.ids.push(arr[i])

                for(var i=0; i<this.ids.length; i++){
                    var content = Object.assign({},this.registerContent); // 深拷贝！否则下面的插入异步操作会导致插入的regisgerid永远是最后一位
                    content.registerId = this.ids[i]
                    this.$db.registerData.loadDatabase()
                    this.$db.registerData.insert(content , function (err, newDoc) {   // Callback is optional
                    });
                }
            },
            handleBankData(){
                var name = this.registerContent.bankName;
                var type = this.registerContent.keyboardType;
                var success = true;
                this.$db.bankData.loadDatabase()
                this.$db.bankData.find({'bankName':name, 'keyboardType':type},  (err, docs)=> {
                    if(docs.length == 0)
                        success = false
                    this.bankDoc = docs;
                    if(!success){
                        var arr = {
                            'bankName': name,
                            'keyboardType': type,
                            'registerId': this.ids
                        };
                        this.$db.bankData.insert(arr , function (err, newDoc) {
                        });
                    }
                    else{
                        var currIds = this.bankDoc[0].registerId;
                        for(var i=0; i<this.ids.length; i++){
                            currIds.push(this.ids[i])
                        }
                        this.$db.bankData.remove({ _id: this.bankDoc[0]._id }, {}, function (err, numRemoved) {
                        });
                        var arr = {
                            'bankName': name,
                            'keyboardType': type,
                            'registerId': currIds
                        };
                        this.$db.bankData.insert(arr , function (err, newDoc) {
                        });
                    }
                });
                
            },
            next () {
                if (this.current < 3) 
                    this.current += 1;
                else if(this.current == 3){
                    this.current += 1;
                    this.$Message.info("添加注册记忆成功");
                }
                else
                    this.$Message.info("添加注册记忆成功");

                if(this.current == 1){
                    this.$refs['target-name'].responseFunction()
                    this.$router.push({ path: 'register-input' })
                }
                else if(this.current == 2){
                    this.$refs['target-name'].responseFunction()
                    this.$router.push({ path: 'register-set' })
                }
                else if(this.current == 3){
                    if(this.$refs['target-name'].alreadyRegisterId.length == 0){
                        this.$Message.info("还未选择注册记忆！");
                        this.current -= 1;
                    }
                    else{
                        // 写入数据库 registerData
                        this.insertRegisterData();
                        // 写入数据库 bankData
                        this.handleBankData();
                        this.$router.push({ path: 'register-finish' })
                    }
                }
            },
            back(){
                if (this.current == 0) 
                    this.$Message.info("已经在第一步了！");
                else if(this.current == 3)
                    this.$Message.info("已经注册成功，不可回退！");
                else {
                    this.modal1 = true;
                }
            },
            ok () {
                this.$Message.info('返回上一步');
                this.current -= 1;
                if(this.current == 0)
                    this.$router.push({ path: 'register-bank' })
                else if(this.current == 1)
                    this.$router.push({ path: 'register-input' })
                else if(this.current == 2)
                    this.$router.push({ path: 'register-set' })
            },
            cancel () {
                this.$Message.info('取消返回操作');
            }
        },
        computed:{
            ...mapGetters(['registerContent'])
        }
    }
</script>