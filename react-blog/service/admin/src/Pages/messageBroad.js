import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button, Switch, Table, Divider, Tag,Layout, Menu, Breadcrumb, Icon } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { confirm } = Modal;

const { Header, Content, Footer, Sider } = Layout;
function MessageBroad(props) {

    // state
    const [list, setList] = useState([])

    // effect
    useEffect(() => {
        getList()
    }, [])

    // function
     //删除文章的方法
     const delArticle = (id) => {
        confirm({
            title: '确定要删除这条评论吗?',
            content: '如果你点击OK按钮，评论将会永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.delMessage + id, { withCredentials: true }).then(
                    res => {
                        message.success('留言删除成功')
                        getList()
                    }
                )
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });
    }

    //得到文章列表
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.message,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setList(res.data.list)

            }
        )
    }

    const columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '回复数',
            key: 'replyCount',
            dataIndex: 'replyCount',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => { delArticle(text.id) }} >删除 </Button>
            ),
        },
    ];

    return (
        <Layout>
            <Table columns={columns} dataSource={list} />
        </Layout>
    )
}

export default MessageBroad
