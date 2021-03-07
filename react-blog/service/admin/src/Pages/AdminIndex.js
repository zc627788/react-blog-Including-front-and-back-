import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import MessageBroad from './messageBroad'
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
            props.history.push('/Article/add')
        } else if (e.key === 'articleList') {
            props.history.push('/Article/list')
        } else {
            props.history.push('/Article/message')

        }
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
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
                        <Menu.Item key="addArticle"><Icon type="message" />添加文章</Menu.Item>
                        <Menu.Item key="articleList"><Icon type="like" />文章列表</Menu.Item>
                        <Menu.Item key="messageBroad">
                            <Icon type="file" />
                            <span>留言管理</span>
                        </Menu.Item>
                    </SubMenu>

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
                            <Route path="/Article" exact component={AddArticle} />
                            <Route path="/Article/add/" exact component={AddArticle} />
                            <Route path="/Article/add/:id" exact component={AddArticle} />
                            <Route path="/Article/list/" exact component={ArticleList} />
                            <Route path="/Article/message" exact component={MessageBroad} />

                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>www.zhangzhuocheng.com</Footer>
            </Layout>
        </Layout>
    )

}

export default AdminIndex
