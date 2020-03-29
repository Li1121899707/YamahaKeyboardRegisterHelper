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
            <div>{{docs}}{{bankDosc}}</div>
            <Collapse simple>
                <Panel v-for="item in bankDosc" :key="item._id">
                    {{item.bankName}}
                    <p slot="content">
                        {{item.keyboardType}}
                        {{item.registerId}}
                    </p>
                </Panel>
            </Collapse>
        </Card>
    </Layout>
</template>
<script>
    export default {
        created(){
            this.findFromRegisterDatabase();
            this.findFromBankDatabase();
        },
        data () {
            return {
                current: 0,
                modal1: false,
                docs: '',
                bankDosc:''
            }
        },
        methods: {
            findFromRegisterDatabase(){
                this.$db.registerData.loadDatabase();
                this.$db.registerData.find({},  (err, docs)=> {
                    this.docs = docs;
                });
            },
            findFromBankDatabase(){
                this.$db.bankData.loadDatabase();
                this.$db.bankData.find({},  (err, docs)=> {
                    this.bankDosc = docs;
                });
            },
            clearAll(){
                this.$db.registerData.loadDatabase();
                this.$db.registerData.remove({}, { multi: true }, function (err, numRemoved) {
                });
                this.$db.bankData.loadDatabase();
                this.$db.bankData.remove({}, { multi: true }, function (err, numRemoved) {
                });
                this.findFromRegisterDatabase();
                this.findFromBankDatabase();
            }
        },
        computed:{
            
        }
    }
</script>