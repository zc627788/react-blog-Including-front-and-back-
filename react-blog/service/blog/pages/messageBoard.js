import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb, Tabs, Radio, Comment, Divider, Button, Card, message, Tooltip, Input, Modal, notification, Tag, Spin, Pagination } from 'antd'
import moment from 'moment'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import 'braft-extensions/dist/code-highlighter.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
// import '../static/style/pages/messageBoard.less' 
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
const { TabPane } = Tabs;

BraftEditor.use(CodeHighlighter({}))

const messageBoard = (list = []) => {
    // state
    const [id, setId] = useState('')

    // effect
    const [mylist, setMylist] = useState(list.data);
    useEffect(() => {
        setMylist(list.data)
        setId(window.location.search.split('=')[1])
    })


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <List
                            itemLayout="vertical"
                            header={
                                <div className="tabFlex">
                                    <span>
                                        <Breadcrumb>
                                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                            <Breadcrumb.Item>留言板</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </span>
                                </div>
                            }
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                            <a style={{ color: '#2e3135' }}>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><Icon type="calendar" />{item.addTime}</span>
                                        <span><Icon type="folder" /> {item.typeName}</span>
                                        <span><Icon type="fire" />  {item.view_count}人</span>
                                    </div>
                                    <div className="list-context">{item.introduce}</div>
                                    <Radio.Group style={{ margin: "10px 0 0 10px" }}>
                                        <Radio.Button value="a"><Icon type="like" />&nbsp;{item.praise}</Radio.Button>
                                        <Radio.Button value="b"><Icon type="message" /> &nbsp;{item.commentCount}</Radio.Button>
                                    </Radio.Group>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert />
                </Col>
            </Row>
            <Footer />

        </>
    )

}


// messageBoard.getInitialProps = async (context) => {
//     let id = context.query.id
//     const promise = new Promise((resolve) => {
//         axios(servicePath.getListById + id).then(
//             (res) => resolve(res.data)
//         )
//     })
//     return await promise
// }

export default messageBoard
