import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb, Tabs, Radio } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
const { TabPane } = Tabs;

const MyList = (list) => {
    // state
    const [id, setId] = useState('')

    // effect
    const [mylist, setMylist] = useState(list.data);
    useEffect(() => {
        setMylist(list.data)
        setId(window.location.search.split('=')[1])
    }, [window.location.search])

    // 搜索
    const searchData = (search) => {
        setMylist(search?.data)
    }

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header searchData={(data) => searchData(data)} />
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
                                            <Breadcrumb.Item>{id !== '2' ? '视频列表' : '留言板'}</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </span>
                                    <Tabs defaultActiveKey="1" className="Tabs" >
                                        <TabPane tab="最新" key="1" >
                                        </TabPane>
                                        <TabPane tab="最受欢迎" key="2">
                                        </TabPane>
                                        <TabPane tab="最多观看" key="3">
                                        </TabPane>
                                    </Tabs>
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


MyList.getInitialProps = async (context) => {
    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getListById + id).then(
            (res) => resolve(res.data)
        )
    })
    return await promise
}

export default MyList
