import { Badge, Card, Descriptions, Divider, Table ,Row,Col, Icon,List, Typography, Tooltip, Input, Tag } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { BasicProfileDataType } from './data.d';
import styles from './style.less';
import ColumnTitle from "./components/ColumnTitle";
import CodeTag from "./../../../components/CodeTag";

const { Text } = Typography;
const { Search } = Input;

interface BasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  menuSetting: BasicProfileDataType;
}
interface MenuManagementState {
  visible: boolean;
  tabActiveKey: string,
  menuTypeActiveKey: string,
}

@connect(
  ({
     menuSetting,
     loading,
   }: {
    menuSetting: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    menuSetting,
    loading: loading.effects['menuSetting/querySysMenuSetting'],
  }),
)
class Basic extends Component<
  BasicProps,
  MenuManagementState
  > {

  public state: MenuManagementState = {
    visible: false,
    tabActiveKey: 'setting',
    menuTypeActiveKey: 'web',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuSetting/querySysMenuSetting',
      callback:(menuGroup)=>{
        console.log(menuGroup)
      }
    });
  }
  handleSearch = (val: string) => {
    console.log(val);
  }
  onTabChange = (key: string) => {
    this.setState({ tabActiveKey: key });
  };
  render() {
    const { menuSetting, loading } = this.props;
    const { tabActiveKey } = this.state;
    console.log(this.props)
    const { basicGoods, menuGroup } = menuSetting;
    let goodsData: typeof basicGoods = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }

    return (
      <PageHeaderWrapper
        onTabChange={this.onTabChange}
        tabActiveKey={tabActiveKey}
        tabList={[
          {
            key: 'setting',
            tab: '设置',
          },
          {
            key: 'list',
            tab: '清单',
          },
        ]}
      >
        {tabActiveKey === 'setting' ? (<div className={styles.groupTab}>
          <Row gutter={24}>
            <Col span={8}>
              <div className={styles.colWrapper}><ColumnTitle titleName="菜单组" method={this.addMenuGroup}/>
                <div className={styles.listWrapper}>
                  <List
                    dataSource={menuGroup}
                    loading={loading}
                    renderItem={(item, index) => {
                    return (
                      <List.Item
                        key={item.id}
                        actions={[<a><Icon type="edit"/></a>, <Text type="danger"><Icon type="delete"/></Text>]}
                      >
                        <List.Item.Meta
                          title={index+1 + '、' + item.menuName}
                          description={<div><CodeTag>{item.menuCode}</CodeTag></div>}
                        />
                      </List.Item>
                    )
                  }}
                    >
                    <List.Item
                      className={styles.active}
                      actions={[<a><Icon type="edit"/></a>, <Text type="danger"><Icon type="delete"/></Text>]}
                    >
                      <List.Item.Meta
                        title="2、活动会议"
                        description={<div><CodeTag>123</CodeTag></div>}
                      />
                    </List.Item>
                  </List>
                </div>
              </div>
            </Col>
            <Col span={8}><div className={styles.colWrapper}><ColumnTitle titleName="菜单" method={this.addMenuGroup} />
              <div className={styles.listWrapper}>
                <List>
                  <List.Item
                    className={styles.active}
                    actions={[<a><Icon type="edit" /></a>, <Text type="danger"><Icon type="delete" /></Text>]}
                  >
                    <List.Item.Meta
                      title="2、活动会议"
                      description={<div><CodeTag>123</CodeTag></div>}
                    />
                  </List.Item>
                  <List.Item
                    actions={[<a><Icon type="edit" /></a>, <Text type="danger"><Icon type="delete" /></Text>]}
                  >
                    <List.Item.Meta
                      title="3、活动会议"
                      description={<div><CodeTag>123</CodeTag></div>}
                    />
                  </List.Item>
                </List>
              </div>
            </div>
            </Col>
            <Col span={8}><div className={styles.colWrapper}><ColumnTitle titleName="页面" method={this.addMenuGroup} />
              <div className={styles.listPageWrapper}>
                <List
                >
                  <List.Item>
                    <List.Item.Meta
                      title={<div className={styles.pageTitle}><div>2、活动会议</div><div className={styles.actionRow}><Tooltip title="添加页面">
                        <a><Icon type="plus-square" /></a>
                      </Tooltip><Divider type="vertical" /><a><Icon type="edit" /></a>  <Divider type="vertical" /><a><Text type="danger"><Icon type="delete" /></Text></a></div> </div>}
                      description={
                        <div>
                          <div><CodeTag>123</CodeTag></div>
                          <div className={styles.buttonBlock}>
                            <div className={styles.buttonRow}>
                              <div>
                                <Tooltip title="删除">
                                  <a><Text type="secondary"><Icon type="close" /></Text></a>
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}><Text>参数删除</Text></span>
                                <span style={{ marginLeft: '10px' }}></span><CodeTag>编码</CodeTag>
                                <span style={{ marginLeft: '10px' }}><CodeTag>授权标识</CodeTag></span>
                              </div>
                            </div>
                            <div className={styles.buttonRow}>
                              <div>
                                <Tooltip title="删除">
                                  <a><Text type="secondary"><Icon type="close" /></Text></a>
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}><Text>参数删除</Text></span>
                                <span style={{ marginLeft: '10px' }}></span><CodeTag>编码</CodeTag>
                                <span style={{ marginLeft: '10px' }}><CodeTag>授权标识</CodeTag></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                </List>
              </div>
            </div>
            </Col>
          </Row>
        </div>) : (<div className={styles.tableTab}>
          <Row style={{ paddingBottom: '20px' }}>
            <Col xs={24} sm={7}>
              <Search
                placeholder="信息检索"
                onSearch={value => this.handleSearch(value)}
                style={{ width: '100%', maxWidth: 400, minWidth: 200 }}
              />
            </Col>
          </Row>
        </div>)
        }
      </PageHeaderWrapper>
    );
  }
}

export default Basic;
