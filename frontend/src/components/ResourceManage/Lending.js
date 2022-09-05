import React from 'react';
import { Typography, Button, Space, Table, AutoComplete, Input, Modal, DatePicker, Select, Tag, Form } from 'antd';
import moment from 'moment';
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { request } from '../../router/http';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Lending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            book: [],
            BorrowModal: false,
            ReturnModal: false,
            BorrowBook: '',
            timeslong: '',

        }

        this.onBorrowModalClicked = this.onBorrowModalClicked.bind(this);
        this.onReturnModalClicked = this.onReturnModalClicked.bind(this);

    };

    borrowref = React.createRef();
    returnref = React.createRef();

    columns = [
        {
            title: '书名',
            dataIndex: 'book_name',
        },
        {
            title: '操作用户',
            dataIndex: 'user_ID',
        },
        {
            title: '操作',
            dataIndex: 'book_status',
            render: tags => (
                <Tag color={tags === 1 ? 'green' : 'volcano'}>
                    {tags === 1 ? '还回' : '借出'}
                </Tag>
            )
        },
        {
            title: '操作时间',
            dataIndex: 'update_time',
            sorter: (a, b) => {
                let adate = new Date(a.update_time)
                let bdate = new Date(b.update_time)
                return adate - bdate;
            },
            defaultSortOrder: "descend",
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: {
                title: '单击排序'
            }
        },
    ]

    daysLong = [
        { value: "7days", label: '近7日' },
        { value: "amonth", label: '近一个月' },
        { value: "halfyear", label: '近半年' },
        { value: "alltime", label: '全部' },
    ]


    onBorrowModalClicked(event) {
        request.get('/book/getBooks').then(res => {
            this.setState({ BorrowModal: true, book: res.data.data });
        })
    }

    onReturnModalClicked(event) {
        request.get('/book/getBooks').then(res => {
            this.setState({ ReturnModal: true, book: res.data.data });
        })
    }

    componentDidMount() {
        request.get('/book/getRent').then(res => {
            this.setState({ data: res.data.data });
        })
    }

    componentWillUpdate(){
    }


    render() {
        return (

            <div style={{ overflow: 'hidden', height: '400px' }}>
                <div style={{
                    float: 'left',
                    width: '30%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Space
                        direction='vertical'
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '80%',
                            width: '90%',
                            borderRadius: '15px',
                            boxShadow: '0 3px 20px -2px rgba(0,0,0,0.12)',
                            //backgroundColor:'#ffffff'
                        }}
                    >

                        <Button
                            type='primary'
                            size='large'
                            //shape='round'
                            style={{
                                borderRadius: '15px',
                                fontSize: '25px',
                                height: '100px',
                                width: '15vw',
                                marginBottom: '10px',
                            }}
                            icon={<LogoutOutlined />}
                            onClick={this.onBorrowModalClicked}
                        > 我要借书 </Button>

                        {/* ---------------------借书模态---------------------- */}

                        <Modal
                            visible={this.state.BorrowModal}
                            width={400}
                            onOk={(event) => {
                                this.borrowref.current.validateFields().then(values => {
                                    values.book_ID = parseInt(values.book_ID);
                                    values.book_status = 2;
                                    request.post("/book/addRent", values).then(response => {
                                        window.location.reload('http://localhost:3001/ResourceManage')
                                    });

                                })
                                    .catch(info => {
                                        console.log('Fail' + info);
                                    })
                            }}

                            onCancel={(event) => {
                                this.borrowref.current.resetFields();
                                this.setState({ BorrowModal: false })
                            }}
                        >
                            <Title level={4}>我要借书</Title>

                            <Form
                                ref={this.borrowref}
                                name='borrowref'
                                onFinish={(values) => {
                                    console.log(values);
                                }}
                            >
                                <Form.Item
                                    name="book_ID"
                                    label="图书ID"
                                    rules={[{ required: true, message: '请填写' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="book_name"
                                    label="图书名称"
                                    rules={[{ required: true, message: '请填写' }]}
                                >
                                    <AutoComplete
                                        filterOption={(input, option) => {
                                            // console.log(input);
                                            return option.value.includes(input)
                                            // option.props.includes(input)
                                        }}
                                        options={
                                            this.state['book'].map(item => {
                                                return {
                                                    value: item.book_name,
                                                    key: item.book_ID
                                                }
                                            })
                                        }
                                    >
                                        <Input />
                                    </AutoComplete>
                                </Form.Item>
                                <Form.Item
                                    name="user_ID"
                                    label="借书人"
                                    rules={[{ required: true, message: '请填写' }]}
                                >
                                    <Input />
                                </Form.Item>

                            </Form>
                        </Modal>



                        <Button
                            type='primary'
                            size='large'
                            //shape='round'
                            style={{
                                borderRadius: '15px',
                                fontSize: '25px',
                                height: '100px',
                                width: '15vw'
                            }}
                            icon={<LoginOutlined />}
                            onClick={this.onReturnModalClicked}
                        > 我要还书 </Button>


                        {/* -----------------------还书模态------------------------ */}

                        <Modal
                            visible={this.state.ReturnModal}
                            width={400}
                            onOk={(event) => {
                                this.returnref.current.validateFields().then(values => {
                                    this.returnref.current.resetFields();
                                    values.book_ID = parseInt(values.book_ID);
                                    values.book_status = 1;
                                    request.post("/book/addRent", values).then(response => {
                                        request.get("/book/getRent").then(res => {
                                            this.setState({ data: res.data.data, ReturnModal: false });
                                        })
                                    });

                                })
                                    .catch(info => {
                                        console.log('Fail' + info);
                                    })
                            }}

                            onCancel={(event) => {
                                this.returnref.current.resetFields();
                                this.setState({ ReturnModal: false })
                            }}
                        >
                            <Title level={4}>我要还书</Title>

                            <Form
                                ref={this.returnref}
                                name='returnref'
                                onFinish={(values) => {
                                    console.log(values);
                                }}
                            >
                                <Form.Item
                                    name="book_ID"
                                    label="图书ID"
                                    rules={[{ required: true, message: '请填写' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="book_name"
                                    label="图书名称"
                                    rules={[{ required: true, message: '请填写' }]}
                                >
                                    <AutoComplete
                                        filterOption={(input, option) => {
                                            return option.value.includes(input)
                                        }}
                                        options={
                                            this.state['book'].map(item => {
                                                return {
                                                    value: item.book_name,
                                                    key: item.book_ID
                                                }
                                            })
                                        }
                                    >
                                        <Input />
                                    </AutoComplete>
                                </Form.Item>
                                <Form.Item
                                    name="user_ID"
                                    label="借书人"
                                    rules={[{ required: true, message: '请填写' }]}
                                >
                                    <Input />
                                </Form.Item>

                            </Form>
                        </Modal>

                    </Space>
                </div>

                <div style={{
                    float: 'right',
                    width: '68%',
                    height: '100%',
                    // display:'flex',
                    // justifyContent: 'center',
                    // alignItems:'center',
                }}>

                    <Space style={{ marginBottom: '10px' }}>
                        <Text type='secondary' >借还记录</Text>
                        <Input.Search
                            allowClear
                            placeholder="请输入书名或用户名"
                            style={{ float: 'right' }}
                            onSearch={value => {
                                let temp = [];
                                if (value !== '') {
                                    request.get('/book/getRent').then(res => {
                                        res.data.data.map(item => {
                                            if (item['book_name'].includes(value) || item['user_ID'].includes(value)) {
                                                temp.push(item);
                                            }
                                        })
                                        this.setState({ data: temp });
                                    })
                                }
                                else {
                                    request.get('/book/getRent').then(res => {
                                        this.setState({ data: res.data.data });
                                    })
                                }
                            }}
                        />
                    </Space>


                    <Select
                        style={{ float: 'right', width: 100 }}
                        options={this.daysLong}
                        defaultValue="alltime"
                        onSelect={values=>{
                            // let temp=[];
                            // if(values==='7days'){
                            //     this.state.data.map(item=>{
                            //         let operDate=new Date(item['update_time']);
                            //         if(moment(moment().toDate()).diff(moment(operDate), 'days')<=7)temp.push(item);
                            //         return item;
                            //     })
                            // }
                            // else if(values==='amonth'){
                            //     this.state.data.map(item=>{
                            //         let operDate=new Date(item['update_time']);
                            //         if(moment().toDate()-operDate<=30)temp.push(item);
                            //         return item;
                            //     })
                            // }
                            // else if(values==='halfyear'){
                            //     this.state.data.map(item=>{
                            //         let operDate=new Date(item['update_time']);
                            //         if(moment().toDate()-operDate<=180)temp.push(item);
                                    
                            //         return item;
                            //     })
                            // }
                            // else {
                            //     request.get('book/getRent').then(res=>{
                            //         temp=res.data.data;
                            //     })
                            // }
                            // console.log(temp);
                            // this.setState({data:temp});
                            this.setState({timeslong:values})
                        }}
                    />



                    <Table
                        dataSource={this.state.data}
                        columns={this.columns}
                        // bordered
                        pagination={false}
                        scroll={{ y: 250 }}
                        size='middle'
                    />

                    <Text style={{
                        float: "right",
                        margin: '10px',
                    }}>
                        <a href="http://www.baidu.com" target="_blank" rel='noreferrer'>借还记录有出入？点我申诉</a>
                    </Text>

                </div>
            </div>

        )
    }
}

export default Lending;