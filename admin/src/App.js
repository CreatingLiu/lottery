import React, { Component } from 'react';
import { Button, Card, Form, Image, InputNumber, Layout, Table, Modal, Input, DatePicker, TimePicker, Space, ConfigProvider, message, Typography } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import './App.less';

const { Header, Content, Footer } = Layout;



class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			editingGift: null,
			giftDataLoading: true,
			modalConfirmLoading: false,
			configSaving: false
		};

		this.giftTableColumns = [
			{
				title: "名称",
				dataIndex: "name"
			},
			{
				title: "图片地址",
				dataIndex: "img",
				colSpan: 2,
				render: img => {
					return (
						<Image height="50px" src={img} />
					);
				}
			},
			{
				title: "",
				colSpan: 0,
				dataIndex: "img",
				keys: "imgSrc"
			},
			{
				title: "概率",
				dataIndex: "probability",
			},
			{
				title: "解锁时间",
				dataIndex: "unlockAt",
				render: date => {
					return date.format("YYYY-MM-DD HH:mm:ss");
				}
			},
			{
				title: "",
				dataIndex: "_id",
				render: id => {
					return <Button onClick={() => this.editGift(id)}>编辑</Button>
				}
			}
		];
		
		this.giftFormRules = {
			name: [
				{
					required: true,
					whitespace: true,
					type: "string"
				}
			],
		
			img: [
				{
					required: true,
					type: "url"
				},
				{
					validator: (_, value) => {
						return new Promise((resolve, reject) => {
							fetch(value)
							.then((value)=>{
								if(value.status === 200) {
									if(value.headers.has("content-type") && value.headers.get("content-type").split("/")[0] === "image")
										resolve();
									else
										reject(new Error("URL指向的不是图片"));
								}else
									reject(new Error("URL无法访问"));
							})
							.catch((e)=>{
								reject(e)
							})
						})
					},
					validateTrigger: "onSubmit"
				}
			],
		
			probability: [
				{
					required: true,
					type: "number"
				}
			],
		
			unlockAt: [
				{
					required: true,
				}
			]
		}

		this.giftData = {};

		this.giftEditFormRef = React.createRef();
		this.configFormRef = React.createRef();

		this.editGift = this.editGift.bind(this);
		this.modalHandleOk = this.modalHandleOk.bind(this);
		this.onGiftFormFinish = this.onGiftFormFinish.bind(this);
		this.onGiftFormFinishFailed = this.onGiftFormFinishFailed.bind(this);
		this.onConfigFormFinish = this.onConfigFormFinish.bind(this);

	}

	componentDidMount() {
		fetch("https://qczxb8.fn.thelarkcloud.com/getFullGiftList").then(x=>x.json())
		.then(data => {
			let giftData = {};
			data.map(item => {
				item.unlockAt = moment(item.unlockAt);
				return giftData[item._id] = item;
			});
			this.giftData = giftData;
			this.setState({giftDataLoading: false});
		})
		.catch(err => {

		})

		fetch("https://qczxb8.fn.thelarkcloud.com/getGlobalConfig").then(x=>x.json())
		.then(data => {
			this.configData = data;
			this.forceUpdate();
			this.configFormRef.current.resetFields();
		})
		.catch(err=> {

		})
	}

	editGift(id) {
		this.setState({
			editingGift: id,
			modalConfirmLoading: false
		})
	}

	modalHandleOk() {
		this.setState({modalConfirmLoading: true});
		this.giftEditFormRef.current.submit();
	}

	onGiftFormFinish(value) {
		fetch(new Request("https://qczxb8.fn.thelarkcloud.com/setGift", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json;charset=utf-8;'
			},
			body: JSON.stringify(value)
		}))
		.then(() => {
			message.success("保存成功!")
			this.giftData[value._id] = value;
			this.setState({editingGift: null});
		})
	}

	onGiftFormFinishFailed() {
		this.setState({
			modalConfirmLoading: false
		})
	}

	onConfigFormFinish(value) {
		fetch(new Request("https://qczxb8.fn.thelarkcloud.com/setGlobalConfig", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json;charset=utf-8;'
			},
			body: JSON.stringify(value)
		}))
		.then(() => {
			message.success("保存成功!");
			this.setState({configSaving: false});
		})
	}

	render() {
		return (
			<ConfigProvider locale={zhCN}>
				<Layout>
					<Header style={{ padding: '0 50px' }}>
						<span style={{ color: "white", fontSize: "2em" }}>掘金抽奖管理平台</span>
					</Header>
					<Content style={{ padding: '20px 50px 0' }}>
						<Card title="全局参数设置" style={{ margin: '16px 0' }}>
							<Form 
								name="config"
								initialValues={this.configData}
								layout="inline"
								ref={this.configFormRef}
								onFinish={this.onConfigFormFinish}
							>
								<Form.Item name="money" label="初始矿石数" >
									<InputNumber />
								</Form.Item>
								<Form.Item name="price" label="每次消耗矿石数" >
									<InputNumber />
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit" loading={this.state.configSaving} onClick={()=>this.setState({configSaving: true})}>保存</Button>
								</Form.Item>
							</Form>
						</Card>
						<Card title="奖品设置" style={{ margin: '16px 0' }}>
							<Table 
								dataSource={Object.values(this.giftData)} 
								columns={this.giftTableColumns} 
								loading={this.state.giftDataLoading}
								pagination={false}
								rowKey="_id"
							/>
						</Card>
					</Content>
					<Footer>
						<Typography>
							<Typography.Link href="">Open source at Github</Typography.Link>
						</Typography>
					</Footer>
					{this.state.editingGift === null ? null : 
						<Modal
							title="编辑奖品"
							visible={true}
							onOk={this.modalHandleOk}
							confirmLoading={this.state.modalConfirmLoading}
							onCancel={() => this.setState({editingGift: null})}
						>
							<Form
								name="gift"
								initialValues={this.giftData[this.state.editingGift]}
								labelCol={{ span: 4 }}
								wrapperCol={{ span: 20 }}
								onFinish={this.onGiftFormFinish}
								onFinishFailed={this.onGiftFormFinishFailed}
								ref={this.giftEditFormRef}
								requiredMark={false}
							>
								<Form.Item name="_id" hidden />
								<Form.Item 
									name="name" 
									label="名称"
									rules={this.giftFormRules.name}
								>
									<Input />
								</Form.Item>
								<Form.Item 
									name="img" 
									label="图片地址"
									validateTrigger={["onChange", "onSubmit"]}
									rules={this.giftFormRules.img}
									validateFirst={true}
								>
									<Input />
								</Form.Item>
								<Form.Item 
									name="probability" 
									label="概率"
									rules={this.giftFormRules.probability}
								>
									<InputNumber />
								</Form.Item>
								<Form.Item label="解锁时间" rules={this.giftFormRules.unlockAt}>
									<Space>
										<Form.Item name="unlockAt" label="解锁时间" noStyle rules={this.giftFormRules.unlockAt}>
											<DatePicker />
										</Form.Item>
										<Form.Item name="unlockAt" label="解锁时间" noStyle rules={this.giftFormRules.unlockAt}>
											<TimePicker />
										</Form.Item>
									</Space>
								</Form.Item>
							</Form>
						</Modal>
					}
				</Layout>
			</ConfigProvider>
		);
	}
}

export default App;
