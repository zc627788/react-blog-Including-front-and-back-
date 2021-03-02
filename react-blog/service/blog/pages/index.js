import '../static/style/pages/index.css'
import React, { useState, useEffect } from 'react'
import { Row, Col, List, Icon, Tabs, Radio, Carousel, Pagination, Button } from 'antd'
import axios from 'axios'
import Particles from "react-tsparticles";
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { orderBy } from 'lodash'

// import { StickyContainer, Sticky } from 'react-sticky';

const { TabPane } = Tabs;

const Home = (list) => {

    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    //---------主要代码-------------start
    // state
    const [mylist, setMylist] = useState(list.data);
    const [tabLeft, setTabLeft] = useState("最新文章");
    const [buttonType, setButtonType] = useState("");


    // function
    // 搜索
    const searchData = (search) => {
        setMylist(search?.data)
    }

    // tabs栏切换
    const tabsChange = (tab) => {
        const tabs = {
            "addTime": "最新文章",
            "praise": "最受欢迎",
            "commentCount": "评论最多"
        }
        setMylist(orderBy(list?.data, [tab], ['desc']))
        setTabLeft(tabs[tab])

    }
    const changType = (e) => {
        const { id, praise } = e.target.value
        const giveGood = async (id, praise) => {
            await axios(`${servicePath.giveGood}${id}/${praise}`).then(
                (res) => { console.log('res', res) }

            )
            await axios(servicePath.getArticleList).then(
                (res) => {
                    setMylist(res.data.data)
                }
            )
        }
        giveGood(id, praise)

    }



    //---------主要代码-------------end
    return (
        <>
            <Particles
                id="tsparticles"
                className="particles"
                options={{
                    background: {
                        color: {
                            value: "rgb(52, 52, 52,0.5)",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
            <Head>
                <title>Home</title>
            </Head>
            <Header searchData={(data) => searchData(data)} />
            <Carousel effect="fade" autoplay >
                <div className="Carousel">
                    <img src="../static/img/node.jpg" alt="" />{/*  */}
                </div>
                <div className="Carousel">
                    <img src="../static/img/vue.jpg" alt="" />
>
                </div>
                <div className="Carousel">
                    <img src="../static/img/react.png" alt="" />
                </div>
            </Carousel>

            <Row className="comm-main" type="flex" justify="center">
                <Particles
                    id="tsparticles"
                    className="particles"
                    options={{
                        background: {
                            color: {
                                value: "rgb(52, 52, 52,0.5)",
                            },
                        },
                        fpsLimit: 60,
                        interactivity: {
                            detectsOn: "canvas",
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                bubble: {
                                    distance: 400,
                                    duration: 2,
                                    opacity: 0.8,
                                    size: 40,
                                },
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outMode: "bounce",
                                random: false,
                                speed: 6,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    value_area: 800,
                                },
                                value: 80,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                random: true,
                                value: 5,
                            },
                        },
                        detectRetina: true,
                    }}
                />
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>

                        <List
                            header={
                                <div className="tabFlex">
                                    <span>{tabLeft}</span>
                                    <Tabs defaultActiveKey="1" onChange={tabsChange} >
                                        <TabPane tab="最新" key="addTime" >
                                        </TabPane>
                                        <TabPane tab="最受欢迎" key="praise">
                                        </TabPane>
                                        <TabPane tab="评论数最多" key="commentCount">
                                        </TabPane>
                                    </Tabs>
                                </div>
                            }
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                            <a style={{ color: '#2e3135' }}>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><Icon type="calendar" /> {item.addTime}</span>
                                        <span><Icon type="folder" /> {item.typeName}</span>
                                        <span><Icon type="fire" /> {item.view_count}人</span>
                                    </div>
                                    <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                                    <Radio.Group style={{ margin: "10px 0 0 10px" }} onChange={changType}>
                                        <Radio.Button value={item} ><Icon type="like" />&nbsp;{item.praise}</Radio.Button>
                                        <Radio.Button value={item.commentCount}><Icon type="message" /> &nbsp;{item.commentCount}</Radio.Button>
                                    </Radio.Group>
                                </List.Item>
                            )}
                            pagination={{
                                pageSize: 4
                            }}
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

Home.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleList).then(
            (res) => {
                resolve(res.data)
            }
        )
    })

    return await promise
}


export default Home
