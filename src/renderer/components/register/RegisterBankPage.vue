<template>
	<Col offset="5" span="14" style="margin-top:50px">
		<Card>
			<Row style="margin-top:40px">
				<Col offset="4" span="4">
					<span style="margin:0 10px 0 0">新增注册记忆库</span>
				</Col>
				<Col>
					<i-switch v-model="addBankSwitch" @on-change="addBank" />
				</Col>
			</Row>
			<Row style="margin:40px 0">
				<Col offset="4" span="4" style="margin-top:5px">
					<span style="margin:0 10px 0 0">注册记忆库名称</span>
				</Col>
				<Col span="10">
					<Input v-model="value" placeholder="输入注册记忆库名称" style="width: 300px" :disabled="inputBankNameDisabled" />
				</Col>
			</Row>
			<Row style="margin:40px 0 20px 0">
				<Col offset="16" span="4">
					<Button type="success" :disabled="addButtonDisabled">添加</Button>
				</Col>
			</Row>
		</Card>
		<Card style="margin-top:40px">
			<Row style="margin-top:40px">
				<Col offset="4" span="4" style="margin-top:5px">
					<span style="margin:0 10px 0 0">键盘型号</span>
				</Col>
				<Col span="10">
					<Select v-model="keyboardTypeSelector">
						<Option v-for="item in keyboardType" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</Col>
			</Row>
			<!-- 注册记忆库 -->
			<Row style="margin:40px 0">
				<Col offset="4" span="4" style="margin-top:5px">
					<span style="margin:0 10px 0 0">注册记忆库</span>
				</Col>
				<Col span="10">
					<Select v-model="bankSelector">
						<Option v-for="item in bank" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</Col>
			</Row>
		</Card>
	</Col>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
    export default {
        data () {
            return {
				value:'',
				inputBankNameDisabled:true,
				addButtonDisabled:true,
				addBankSwitch: false,
				keyboardType:[
					{
						value:"PSR-S670",
                        label:"PSR-S670"
					},
					{
						value:"KB-309",
                        label:"KB-309"
					},
					{
						value:"KB-290",
                        label:"KB-290"
					},
					{
						value:"KB-280",
                        label:"KB-280"
					}
				],
                bank:[
                    {
                        value:"即兴曲",
                        label:"即兴曲"
                    },
                    {
                        value:"阳光照耀着塔什库尔干",
                        label:"阳光照耀着塔什库尔干"
                    }
                ],
                keyboardTypeSelector: 'PSR-S670',
                bankSelector: '即兴曲'
            }  
        },
		methods: {
            addBank (status) {
                status ? this.$Message.info('可以添加注册记忆库') : this.$Message.info('禁止添加注册记忆库');
                this.inputBankNameDisabled = !status;
				this.addButtonDisabled = !status;
            },
			responseFunction(){
				var keyboard = this.keyboardTypeSelector;
				var bank = this.bankSelector
				this.$store.dispatch('modifyKeyboardType',keyboard) // 修改store中的keyboard
				this.$store.dispatch('modifyBankName',bank) // 修改store中的bank
			},
        }

    }
</script>