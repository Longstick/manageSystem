import React from 'react';
import { Table, Typography, Input, Space, Button, Modal, Popconfirm, message, Form, Select } from 'antd';
import { request } from '../../router/http';

const { Text, Title } = Typography;
export default class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newModal: false,
            modModal: false,
            moding: {},
        }
    }


    formref = React.createRef();
    modref = React.createRef();

    columns = [
        {
            title: '耗材ID',
            dataIndex: 'resourceID',
            key: 'resourceID',
        },
        {
            title: "耗材名称",
            dataIndex: "resourceName",
            key: "resourceName",
        },
        {
            title: "耗材种类",
            dataIndex: "resourcetype",
            key: "resourcetype",
        },
        {
            title: "数量",
            dataIndex: "count",
            key: "count",
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
                            this.setState({ modModal: true, moding: record }, () => {
                                this.modref.current.setFieldsValue({
                                    resourceName: record.resourceName,
                                    resourcetype: record.resourcetype,
                                    count: record.count
                                })
                            });
                        }}
                    >修改</Button>

                    <Popconfirm
                        title="确定要删除吗？"
                        onConfirm={event => {
                            request.delete('/resources/deleteResource/' + record['resourceID']).then(res => {
                                message.success("删除" + record['resourceID'] + '成功！')
                                request.get("/resources/getResource").then(res => {
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

    ResourceType = [
        { value: '微机实验器材' },
        { value: '化学实验器材' },
        { value: '物理实验器材' },
        { value: '日用消耗品' },
        { value: '精密仪器及零件' },
        { value: '化学药品' },

    ]

    componentDidMount() {
        request.get('/resources/getResource').then(res => {
            this.setState({ data: res.data.data });
        })
    }

    render() {
        return (
            <div>
                <Space style={{ marginBottom: '20px' }}>
                    <Text type='secondary' >查询库存</Text>
                    <Input.Search
                        allowClear
                        placeholder="请输入耗材名称或ID"
                        onSearch={value => {
                            let temp = [];
                            if (value !== '') {
                                request.get('/resources/getResource').then(res => {
                                    res.data.data.map(item => {
                                        if (item['resourceName'].includes(value) || item['resourceID'] + "" === value) {
                                            temp.push(item);
                                        }
                                        return item;
                                    })
                                    this.setState({ data: temp });
                                })
                            }
                            else {
                                request.get('/resources/getResource').then(res => {
                                    this.setState({ data: res.data.data });
                                })
                            }
                        }}
                    />
                </Space>

                <Button
                    size="large"
                    type="primary"
                    onClick={event => {
                        this.setState({ newModal: true })
                    }}
                    style={{ float: 'right' }}
                >
                    新增耗材</Button>

                <Table
                    dataSource={this.state.data}
                    // scroll={{y:'300px'}} 
                    columns={this.columns}
                />


                {/* --------------------- 新建模态框------------------------ */}
                <Modal
                    visible={this.state.newModal}
                    width={400}
                    onOk={(event) => {
                        this.formref.current.validateFields().then(values => {
                            this.formref.current.resetFields();
                            request.post("/resources/addResource", values).then(response => {
                                request.get("/resources/getResource").then(res => {
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
                    <Title level={4}>新增耗材</Title>

                    <Form
                        ref={this.formref}
                        name='newref'
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >

                        <Form.Item
                            name="resourceName"
                            label="耗材名称"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="resourcetype"
                            label="耗材种类"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={this.ResourceType} />
                        </Form.Item>

                        <Form.Item
                            name="count"
                            label="耗材数量"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>





                {/* --------------------------修改模态------------------------ */}

                <Modal
                    visible={this.state.modModal}
                    width={400}
                    onOk={(event) => {
                        this.modref.current.validateFields().then(values => {
                            console.log(values)
                            this.modref.current.resetFields();
                            values.resourceID = this.state.moding['resourceID'];
                            request.post("/resources/changeResource", values).then((response) => {
                                console.log(response);
                                request.get("/resources/getResource").then(res => {
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

                    <Title level={4}>修改耗材信息</Title>

                    <Form
                        ref={this.modref}
                        name='modref'
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >

                        <Form.Item
                            name="resourceName"
                            label="图书名称"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="resourcetype"
                            label="图书种类"
                        >
                            <Select options={this.ResourceType} />
                        </Form.Item>

                        <Form.Item
                            name="count"
                            label="耗材数量"
                        >
                            <Input />
                        </Form.Item>

                    </Form>
                </Modal>


            </div>


        )
    }



}
