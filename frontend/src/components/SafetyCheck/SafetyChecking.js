import React from 'react';
import { Table, Space, Button, Progress } from 'antd';
import { CheckCircleFilled, LoadingOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const data = [
    {
        key: '1',
        checkType: '消防安全',
        checkStatus: 'Safe'
    },
    {
        key: '2',
        checkType: '用电安全',
        checkStatus: 'Safe'
    },
    {
        key: '3',
        checkType: '冰箱安全',
        checkStatus: 'Danger'
    },
    {
        key: '4',
        checkType: '生化安全',
        checkStatus: 'Danger'
    },
];


const { Column } = Table;


class SafetyChecking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CascaderKey: "",
            percent: 0,
        }

        this.onChange = this.onChange.bind(this);
    };



    onChange(value) {
        this.setState({ CascaderKey: value }, () => {
            console.log(this.state.CascaderKey)
        })
    }

    render() {
        return (
            <div style={{ height: '300px' }}>
                <div style={{
                    float: 'left',
                    //position: 'relative',
                    width: '30%',
                    height: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
                >
                    <Progress
                        status='active'
                        type="circle"
                        percent={this.state.percent}
                        width={180}
                    />
                    <Button
                        style={{ margin: '20px' }}
                        size={'large'}
                        type={'primary'}
                        shape={'round'}
                        onClick={() => {
                            this.setState({ percent: 0 })
                            for (let i = 1; i <= 10; i++) {
                                setTimeout(() => {
                                    this.setState({ percent: this.state.percent + 10 })
                                    console.log(this.percent)
                                }, 1500 * i * Math.random())
                            }
                        }}
                    > 全面检查 </Button>

                </div>


                <div style={{
                    //display:'inline-block',
                    width: '70%',
                    float: 'right'
                }}>
                    <Table
                        dataSource={data}
                        pagination={false}
                    >
                        {/* <ColumnGroup title="Name">
                        <Column title="First Name" dataIndex="firstName" key="firstName" />
                        <Column title="Last Name" dataIndex="lastName" key="lastName" />
                    </ColumnGroup> */}
                        <Column
                            title="检查类型"
                            dataIndex="checkType"
                            key="checkType"

                        />
                        <Column
                            title="状态"
                            dataIndex="checkStatus"
                            key="checkStatus"
                            width="50%"
                            render={tags => {
                                if (this.state.percent === 0) {
                                    return (
                                        <>
                                            未检查
                                        </>
                                    )
                                }
                                else if (this.state.percent < 100)
                                    return (
                                        <>
                                            <LoadingOutlined />
                                            检查中...
                                        </>
                                    )
                                else return (
                                    <>
                                        {tags === 'Safe' ?
                                            (<Space style={{ color: 'green' }}><CheckCircleOutlined />{tags}</Space>) :
                                            (<Space style={{ color: 'red' }}><ExclamationCircleOutlined />{tags}</Space>)
                                        }
                                    </>
                                )
                            }}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}

export default SafetyChecking;