import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import '../static/css/AdminIndex.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e => {
        if (e.key === 'addArticle') {
            console.log('object', e)
            props.history.push('/index/add')
        } else {
            props.history.push('/index/list')
        }
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>R
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" style={{ 'background': ` left / contain no-repeat url("https://i.52112.com/icon/jpg/256/20181004/22558/1103518.jpg")`, 'backgroundColor': 'transparent' }} ></div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu
                        key="sub1"
                        onClick={handleClickArticle}
                        title={
                            <span>
                                <Icon type="desktop" />
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div>
                            <Route path="/index/" exact component={AddArticle} />
                            <Route path="/index/add/" exact component={AddArticle} />
                            <Route path="/index/add/:id" exact component={AddArticle} />
                            <Route path="/index/list/" exact component={ArticleList} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>www.zhangzhuocheng.com</Footer>
            </Layout>
        </Layout>
    )

}

export default AdminIndex
