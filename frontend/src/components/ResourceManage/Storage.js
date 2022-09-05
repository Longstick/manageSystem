import React from 'react';
import { Table, Typography, Input, Space, Button, Tag, Modal, Popconfirm, message, Form, Select } from 'antd';
import { request } from '../../router/http';

const { Text, Title } = Typography;
const { Option } = Select;
class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newModal: false,
            modModal: false,
            modingEqu: {},
        }
    }


    formref = React.createRef();
    modref = React.createRef();

    columns = [
        {
            title: '图书ID',
            dataIndex: 'book_ID',
            key: 'book_ID',
        },
        {
            title: "书名",
            dataIndex: "book_name",
            key: "book_name",
        },
        {
            title: "图书种类",
            dataIndex: "book_type",
            key: "book_type",
        },
        {
            title: "出借情况",
            dataIndex: "book_status",
            key: "book_status",
            render: tags => (
                <Tag color={
                    tags === 1 ? "green" : 'volcano'
                }>
                    {tags === 1 ? '未借出' : '已借出'}
                </Tag>
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
                            this.setState({ modModal: true, modingEqu: record }, () => {
                                this.modref.current.setFieldsValue({
                                    book_name: record.book_name,
                                    book_type: record.book_type,
                                    book_status: record.book_status
                                })
                            });
                        }}
                    >修改</Button>

                    <Popconfirm
                        title="确定要删除吗？"
                        onConfirm={event => {
                            request.delete('/book/deleteBook/' + record['book_ID']).then(res => {
                                message.success("删除" + record['book_ID'] + '成功！')
                                request.get("/book/getBooks").then(res => {
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

    bookType = [
        { value: '数学学科书' },
        { value: '历史学科书' },
        { value: '化学学科书' },
        { value: '建筑学学科书' },
        { value: '计科学科书' },
        { value: '电子学科书' },

    ]

    componentDidMount() {
        request.get('/book/getBooks').then(res => {
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
                        placeholder="请输入书名或ID"
                        onSearch={value => {
                            let temp = [];
                            if (value !== '') {
                                request.get('/book/getBooks').then(res => {
                                    res.data.data.map(item => {
                                        if (item['book_name'].includes(value) || item['book_ID'] + "" === value) {
                                            temp.push(item);
                                        }
                                        return item;
                                    })
                                    this.setState({ data: temp });
                                })
                            }
                            else {
                                request.get('/book/getBooks').then(res => {
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
                    style={{float: 'right'}}
                >
                    新增书目</Button>

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
                            request.post("/book/addBook", values).then(response => {
                                request.get("/book/getBooks").then(res => {
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
                    <Title level={4}>新增书目</Title>

                    <Form
                        ref={this.formref}
                        name='newref'
                        onFinish={(values) => {
                            console.log(values);
                        }}
                    >

                        <Form.Item
                            name="book_name"
                            label="图书名称"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="book_type"
                            label="图书种类"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select options={this.bookType} />
                        </Form.Item>

                        <Form.Item
                            name="book_status"
                            label="出借情况"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select>
                                <Option value='2'>已出借</Option>
                                <Option value='1'>未出借</Option>
                            </Select>
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
                            values.book_ID = this.state.modingEqu['book_ID'];
                            request.post("/book/changeBook", values).then((response) => {
                                console.log(response);
                                request.get("/book/getBooks").then(res => {
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
                            name="book_name"
                            label="图书名称"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="book_type"
                            label="图书种类"
                        >
                            <Select options={this.bookType} />
                        </Form.Item>

                        <Form.Item
                            name="book_status"
                            label="出借情况"
                        >
                            <Select>
                                <Option value={2}>已出借</Option>
                                <Option value={1}>未出借</Option>
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>


            </div>


        )
    }



}


export default Storage;
