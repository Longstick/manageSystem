import React from 'react';
import { Table, Space, Select, Button, Typography } from 'antd';
// import {} from '@ant-design/icons'

const data = [
    {
        key: '1',
        Type: '危险品',
        Name: '雷管',
        Location: '化学实验室',
        Details: '还入实验室',
    },
    {
        key: '5',
        Type: '危险品',
        Name: '雷管',
        Location: '化学实验室',
        Details: '还入实验室',
    },
    {
        key: '6',
        Type: '危险品',
        Name: '浓硫酸',
        Location: '化学实验室',
        Details: '还入实验室',
    },
    {
        key: '7',
        Type: '危险品',
        Name: '高纯度氢气',
        Location: '化学实验室',
        Details: '还入实验室',
    },
    {
        key: '2',
        Type: '易燃品',
        Name: '白磷',
        Location: '物理实验室',
        Details: '借出实验室',
    },
    {
        key: '3',
        Type: '有毒品',
        Name: '氯水',
        Location: '化学实验室',
        Details: '安全检查',
    },
];

const { Column } = Table;
const { Option } = Select;
const { Text } = Typography;

class SafetyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectKey: "",
            SelectDatas: data,
        }

        this.onChange = this.onChange.bind(this);
    };

    onChange(value) {
        this.setState({ SelectKey: value }, () => {
            if (value === "All") {
                this.setState({ SelectDatas: data });
                return;
            }
            let temp = [];
            data.map(params => {
                if (params.Type === value) {
                    temp.push(params);
                }
                return temp;
            })
            this.setState({ SelectDatas: temp });
        })
    }

    render() {
        return (
            <div>
                {/* <div> */}
                <Space>
                    <Text type={'secondary'}>选择查询品类</Text>
                    <Select
                        defaultValue="所有"
                        style={{ width: '25vmin' }}
                        //allowClear={true}
                        onChange={this.onChange}
                    >
                        <Option value="All">所有</Option>
                        <Option value="危险品">危险品</Option>
                        <Option value="易燃品">易燃品</Option>
                        <Option value="有毒品">有毒品</Option>

                    </Select>
                </Space>
                {/* </div> */}
                <Table
                    dataSource={this.state.SelectDatas}
                    //TableLayout={'fixed'}
                    size={'middle'}
                    pagination={{
                        pLocationSize: 6,
                        hideOnSinglePLocation: 'true',
                        //showQuickJumper:'true',
                    }}
                >
                    {/* <ColumnGroup title="Name">
                        <Column title="First Name" dataIndex="Type" key="Type" />
                        <Column title="Last Name" dataIndex="Name" key="Name" />
                    </ColumnGroup> */}
                    <Column title="物品名称" dataIndex="Name" key="Name" width="20%"/>
                    <Column title="物品类型" dataIndex="Type" key="Type" width="20%"/>
                    <Column title="位置信息" dataIndex="Location" key="Location" />
                    <Column title="操作信息" dataIndex="Details" key="Details" />

                </Table>
            </div>
        )
    }
}

export default SafetyTable;