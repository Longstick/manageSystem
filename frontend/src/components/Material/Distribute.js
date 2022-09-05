import React from 'react';
import { Table, Space, Button, Typography, Checkbox, Divider, Tag, Modal, Input, Select, Form, Popconfirm, message } from 'antd';
import {Route, Switch,Redirect,Link} from 'react-router-dom';
import { request } from '../../router/http';
// import {} from '@ant-design/icons'

const { Search } = Input;
const { Text, Title } = Typography;
const CheckboxGroup = Checkbox.Group;

export default class DeviceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newModal: false,
            modModal: false,
            moding: {}
        }

        this.onNewModal = this.onNewModal.bind(this);
        this.onModModal = this.onModModal.bind(this);
    };


    columns = [
        {
            title: '耗材ID',
            dataIndex: 'resourceID',
        },
        {
            title: '耗材名称',
            dataIndex: 'resourceName',
        },
        {
            title: '耗材类型',
            dataIndex: 'resourcetype',
        },
        {
            title: '数量',
            dataIndex: 'count',
        },
        {
            title: '消耗或补给',
            dataIndex: 'rd_status',
            render: tags => (
                <Tag color={
                    tags === 2 ? 'green' : 'volcano'
                }>
                    {tags === 2 ? '补给' : '消耗'}
                </Tag>
            ),
        },
        {
            title: '操作时间',
            dataIndex: 'update_time',
            render:tags=>(
                <>
                    {tags.split(' ')[0]}
                </>
            )
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
                            this.setState({ moding: record, modModal: true }, () => {
                                this.modref.current.setFieldsValue({
                                    resourceID: record.resourceID,
                                    resourceName: record.resourceName,
                                    rd_status: record.rd_status,
                                    resourcetype: record.resourcetype,
                                    count: record.count,
                                    rd_userID: record.rd_userID,

                                })
                            });
                        }}
                    >修改</Button>

                    <Popconfirm
                        title="确定要删除吗？"
                        onConfirm={event => {
                            request.delete('/resources/deleteDistribute/' + record['id']).then(res => {
                                message.success("删除" + record['resourceName'] + '成功!')
                                request.get("/resources/getDistribute").then(res => {
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

    TypeOptions = [
        { value: '化学实验器材' },
        { value: '化学药品' },
        { value: '物理实验耗材' },
        { value: '实验用具' },
        { value: '精密仪器及部件' },
        { value: '日用消耗品类' },
        { value: '生物实验耗材' },

    ]

    StatusOptions = [
        { value: 1, label: '消耗' },
        { value: 2, label: '补给' }
    ]


    formref = React.createRef();
    modref = React.createRef();

    componentDidMount() {
        // request.post("/manage/login", {
        //     "account": "admin",
        //     "password": "123456"
        // }).then(
        //     res => {
        //         console.log(res);
        //     }
        // )
        request.get("/resources/getDistribute").then(
            res => {
                this.setState({ data: res.data.data }, () => {
                    console.log(this.state.data);
                })
            }
        )
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
                        <Text type={'secondary'}>查询耗材情况</Text>
                        <Search
                            style={{ width: '20vw' }}
                            allowClear
                            placeholder="请输入耗材名称或ID"
                            onSearch={value => {
                                let temp = [];
                                if (value !== '') {
                                    request.get('/resources/getDistribute').then(res => {
                                        res.data.data.map(item => {
                                            if (item['resourceID'] + "" === value || item['resourceName'] === value) {
                                                temp.push(item);
                                            }
                                        })
                                        this.setState({ data: temp });
                                    })
                                }
                                else {
                                    request.get('/resources/getDistribute').then(res => {
                                        this.setState({ data: res.data.data });
                                    })
                                }
                            }}
                        />
                    </Space>

                    <Space style={{ marginBottom: 20, float: 'right' }}>
                        <Button type="primary" size='large' onClick={(event) => {
                            this.setState({ newModal: true });
                        }}>添加记录</Button>
                        <a href="http://localhost:3001/SafetyCheck">
                            <Button size="large">
                            危险品检查
                            </Button>
                        </a>
                    </Space>
                </div>

                {/* -----------------表格--------------------- */}

                <Table
                    // key={this.state.data}
                    dataSource={this.state.data}
                    TableLayout={'auto'}
                    columns={this.columns}
                    size='middle'
                />

                {/* -----------------新建模态框-------------------- */}
                <Modal
                    visible={this.state.newModal}
                    width={400}
                    onOk={(event) => {
                        this.formref.current.validateFields().then(values => {
                            request.post("/resources/addDistribute", values).then(response => {
                                window.location.reload("http://localhost:3001/Material");
                            }).catch(error => {
                                message.error('没有找到该耗材ID！')
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
                    <Title level={4}>添加记录</Title>

                    <Form
                        ref={this.formref}
                        name='newref'
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >

                        <Form.Item
                            name="resourcetype"
                            label="耗材类型"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={this.TypeOptions} />
                        </Form.Item>

                        <Form.Item
                            name="rd_status"
                            label="消耗或补给"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={this.StatusOptions} />
                        </Form.Item>

                        <Form.Item name="resourceID" label="耗材ID" rules={[{ required: true, message: '请选择' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="resourceName" label="耗材名称" rules={[{ required: true, message: '请填写' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="count" label="耗材数量" rules={[{ required: true, message: '请填写' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="rd_userID" label="记录人" rules={[{ required: true, message: '请填写' }]}>
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
                            values.id = this.state.moding['id'];
                            request.post("/resources/changeDistribute", values).then((response) => {
                                // request.get("/resources/getDistribute").then(res => {
                                //     this.setState({ data: res.data.data, modModal: false });
                                // })
                                window.location.reload("http://localhost:3001/Material");
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


                    <Title level={4}>修改信息</Title>

                    <Form
                        ref={this.modref}
                        name='modref'
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >

                        <Form.Item
                            name="resourcetype"
                            label="耗材类型"
                        >
                            <Select options={this.TypeOptions} />
                        </Form.Item>

                        <Form.Item
                            name="rd_status"
                            label="消耗或补给"
                        >
                            <Select options={this.StatusOptions} />
                        </Form.Item>

                        <Form.Item name="resourceID" label="耗材ID">
                            <Input />
                        </Form.Item>

                        <Form.Item name="resourceName" label="耗材名称">
                            <Input />
                        </Form.Item>

                        <Form.Item name="count" label="耗材数量">
                            <Input />
                        </Form.Item>

                        <Form.Item name="rd_userID" label="记录人">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>



            </div>
        )
    }
}
