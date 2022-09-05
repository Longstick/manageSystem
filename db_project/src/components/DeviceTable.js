import React from 'react';
import { Table, Space, Button, Typography, Checkbox, Divider, Tag, Modal, Input, Select, Form, Popconfirm, message } from 'antd';
import { request } from '../router/http';
// import {} from '@ant-design/icons'

const LocationOptions = ['大数据院楼', '城交院楼', '中德院楼', '创设院楼', '新能源院楼', '生医院楼'];
const RoomOptions = ['实验室', '办公室', '工作室']
const DeviceOptions = ['服务器', 'PC', '单片机']

const { Search } = Input;
const { Text, Title } = Typography;
const CheckboxGroup = Checkbox.Group;

class DeviceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            CascaderKey: "",
            SelectedLocationOptions: LocationOptions,
            SelectedDeviceOptions: DeviceOptions,
            SelectedRoomOptions: RoomOptions,

            newModal: false,
            modModal: false,
            modingEqu: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onAllSelected = this.onAllSelected.bind(this);
        this.onAllClear = this.onAllClear.bind(this);

        this.onLocateChange = this.onLocateChange.bind(this);
        this.onRoomChange = this.onRoomChange.bind(this);
        this.onDeviceChange = this.onDeviceChange.bind(this);

        this.onNewModal = this.onNewModal.bind(this);
        this.onModModal = this.onModModal.bind(this);
    };


    columns = [
        {
            title: '学院',
            dataIndex: 'et_college',
        },
        {
            title: '设备ID',
            dataIndex: 'et_equipID',
        },
        {
            title: '教室号',
            dataIndex: 'et_classID',
        },
        {
            title: '设备种类',
            dataIndex: 'et_type',
        },
        {
            title: '设备情况',
            dataIndex: 'et_equipstatus',
            render: tags => (
                <Tag color={
                    tags === '正常' ? 'green' : 'volcano'
                }>
                    {tags}
                </Tag>
            ),
        },
        {
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button
                        //style={{display:'inline'}}
                        type="link"
                        size="small"
                        onClick={event => {
                            this.setState({ modingEqu: record, modModal: true }, () => {
                                this.modref.current.setFieldsValue({
                                    et_college: record.et_college,
                                    et_equipID: record.et_equipID,
                                    et_classID: record.et_classID,
                                    et_type : record.et_type,
                                    et_equipstatus: record.et_equipstatus
                                })
                            });
                        }}
                    >修改</Button>

                    <Popconfirm
                        title="确定要删除吗？"
                        onConfirm={event => {
                            request.delete('/equip/deleteEquip/' + record['id']).then(res => {
                                message.success("删除" + record['et_equipID'] + '成功！')
                                request.get("/equip/getEquip").then(res => {
                                    this.setState({ data: res.data.data })
                                })
                            });


                        }}
                    >
                        <Button
                            //style={{display:'inline'}}
                            type="link"
                            size="small"
                        >删除</Button>
                    </Popconfirm>

                </Space>
            )
        }
    ]

    LocaOptions = [
        { value: '大数据院楼' },
        { value: '创设院楼' },
        { value: '生医院楼' },
        { value: '新能源院楼' },
        { value: '中德院楼' },
        { value: '城交院楼' },
    ]

    TypeOptions = [
        { value: '机械臂' },
        { value: '单片机' },
        { value: '电器工具' },
        { value: '机床' },
        { value: '机柜' },
        { value: '精密仪器' },
    ]

    StatusOptions = [
        { value: "正常" },
        { value: "损坏" }
    ]


    formref = React.createRef();
    modref = React.createRef();

    componentDidMount() {
        request.post("/manage/login", {
            "account": "admin",
            "password": "123456"
        }).then(
            res => {
                console.log(res);
            }
        )
        request.get("/equip/getEquip").then(
            res => {
                this.setState({ data: res.data.data }, () => {
                    console.log(this.state.data);
                })
            }
        )
    }

    onChange(value) {
        this.setState({ CascaderKey: value }, () => {
            console.log(this.state.CascaderKey)
        })
    }

    onLocateChange(list) {
        this.setState({ SelectedLocationOptions: list })
    }
    onRoomChange(list) {
        this.setState({ SelectedRoomOptions: list })
    }
    onDeviceChange(list) {
        this.setState({ SelectedDeviceOptions: list })
    }


    onAllSelected(event) {
        this.setState({
            SelectedLocationOptions: LocationOptions,
            SelectedDeviceOptions: DeviceOptions,
            SelectedRoomOptions: RoomOptions,
        })
    }

    onAllClear(event) {
        this.setState({
            SelectedLocationOptions: [],
            SelectedDeviceOptions: [],
            SelectedRoomOptions: [],
        })
    }

    onSearch = (event) => {
        console.log([
            this.state.SelectedLocationOptions,
            this.state.SelectedRoomOptions,
            this.state.SelectedDeviceOptions
        ])
    }

    onNewModal(event) {
        this.setState({ newModal: true })
    }

    onModModal(event) {
        this.setState({ modModal: true })
    }

    render() {
        return (
            <div>

                <div>

                    <Space>
                        <Text type={'secondary'}>学院楼: </Text>
                        <CheckboxGroup
                            options={LocationOptions}
                            value={this.state.SelectedLocationOptions}
                            onChange={this.onLocateChange}
                        />
                    </Space>
                    <Divider />

                    <Space>
                        <Text type={'secondary'}>房间类型: </Text>
                        <CheckboxGroup
                            options={RoomOptions}
                            value={this.state.SelectedRoomOptions}
                            onChange={this.onRoomChange}
                        />
                    </Space>
                    <Divider />

                    <Space>
                        <Text type={'secondary'}>设备类型: </Text>
                        <CheckboxGroup
                            options={DeviceOptions}
                            value={this.state.SelectedDeviceOptions}
                            onChange={this.onDeviceChange}
                        />
                    </Space>
                    <Divider />

                </div>
                <Space style={{ width: '100%', marginBottom: '5vh' }}>
                    <Button shape='round' type='primary' size='large' onClick={this.onSearch}>查询</Button>
                    <Button type='link' size='small' onClick={this.onAllSelected}>全选</Button>
                    <Button type='link' size='small' onClick={this.onAllClear}>全不选</Button>
                </Space>

                <div>
                    <Space>
                        <Text type={'secondary'}>查询设备信息</Text>
                        <Search
                            style={{ width: '20vw' }}
                            allowClear
                            placeholder="请输入设备ID或班级号"
                            onSearch={value => {
                                let temp = [];
                                if (value !== '') {
                                    request.get('/equip/getEquip').then(res => {
                                        res.data.data.map(item => {
                                            if (item['et_equipID'] === value || item['et_classID'] + "" === value) {
                                                temp.push(item);
                                            }
                                        })
                                        this.setState({ data: temp });
                                    })
                                }
                                else {
                                    request.get('/equip/getEquip').then(res => {
                                        this.setState({ data: res.data.data });
                                    })
                                }
                            }}
                        />
                    </Space>

                    <Space style={{ marginBottom: 20, float: 'right' }}>
                        <Button type="primary" size="large" onClick={(event) => {
                            this.setState({ newModal: true });
                        }}>新增设备</Button>
                        <Button size="large">导出表格</Button>

                    </Space>
                </div>

                {/* -----------------表格--------------------- */}

                <Table
                    // key={this.state.data}
                    dataSource={this.state.data}
                    TableLayout={'auto'}
                    columns={this.columns}
                />

                {/* -----------------新建模态框-------------------- */}
                <Modal
                    visible={this.state.newModal}
                    width={400}
                    onOk={(event) => {
                        this.formref.current.validateFields().then(values => {
                            this.formref.current.resetFields();
                            request.post("/equip/addEquip", values).then(response => {
                                request.get("/equip/getEquip").then(res => {
                                    this.setState({ data: res.data.data, newModal: false });
                                })
                            });

                        })
                            .catch(info => {
                                console.log('Fail' + info);
                            })
                    }}

                    onCancel={(event) => {
                        this.formref.current.resetFields();
                        this.setState({ newModal: false })
                    }}
                >
                    <Title level={4}>新增设备</Title>

                    <Form
                        ref={this.formref}
                        name='newref'
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >

                        <Form.Item
                            name="et_college"
                            label="所属学院"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={this.LocaOptions} />
                        </Form.Item>

                        <Form.Item
                            name="et_type"
                            label="设备类型"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={this.TypeOptions} />
                        </Form.Item>

                        <Form.Item
                            name="et_equipstatus"
                            label="设备状态"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={this.StatusOptions} />
                        </Form.Item>

                        <Form.Item name="et_classID" label="教室号" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="et_equipID" label="设备ID" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>

                    </Form>
                </Modal>



                {/* ------------------修改模态框---------------------- */}


                <Modal
                    visible={this.state.modModal}
                    width={400}
                    onOk={(event) => {
                        this.modref.current.validateFields().then(values => {
                            this.modref.current.resetFields();
                            values.id = this.state.modingEqu['id'];
                            request.post("/equip/changeEquip", values).then((response) => {
                                request.get("/equip/getEquip").then(res => {
                                    this.setState({ data: res.data.data, modModal: false });
                                })
                            })

                        })
                            .catch(info => {
                                console.log('Fail' + info);
                            })
                    }}

                    onCancel={(event) => {
                        this.modref.current.resetFields();
                        this.setState({ modModal: false })
                    }}
                >


                    <Title level={4}>修改设备</Title>

                    <Form
                        ref={this.modref}
                        name='modref'
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >

                        <Form.Item
                            name="et_college"
                            label="所属学院"
                        >
                            <Select options={this.LocaOptions} key={this.state.modingEqu["et_college"]}
                                defaultValue={this.state.modingEqu["et_college"]}
                            />
                        </Form.Item>

                        <Form.Item
                            name="et_type"
                            label="设备类型"
                        >
                            <Select options={this.TypeOptions} key={this.state.modingEqu["et_type"]}
                                defaultValue={this.state.modingEqu["et_type"]} />
                        </Form.Item>

                        <Form.Item
                            name="et_equipstatus"
                            label="设备状态"
                        >
                            <Select options={this.StatusOptions} key={this.state.modingEqu["et_equipstatus"]}
                                defaultValue={this.state.modingEqu["et_equipstatus"]} />
                        </Form.Item>

                        <Form.Item name="et_classID" label="教室号">
                            <Input key={this.state.modingEqu["et_classID"]}
                                defaultValue={this.state.modingEqu["et_classID"]} />
                        </Form.Item>

                        <Form.Item name="et_equipID" label="设备ID">
                            <Input key={this.state.modingEqu["et_equipID"]}
                                defaultValue={this.state.modingEqu["et_equipID"]} />
                        </Form.Item>

                    </Form>
                </Modal>



            </div>
        )
    }
}

export default DeviceTable;