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
    const config = {
        fpsLimit: 60,
        particles: {
            number: {
                value: 0,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ff0000",
                animation: {
                    enable: true,
                    speed: 180,
                    sync: true
                }
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "https://cdn.matteobruni.it/images/particles/github.svg",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 3,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 15,
                random: {
                    enable: true,
                    minimumValue: 5
                },
                animation: {
                    enable: true,
                    speed: 5,
                    minimumValue: 5,
                    sync: true,
                    startValue: "min",
                    destroy: "max"
                }
            },
            links: {
                enable: false
            },
            move: {
                enable: true,
                speed: 15,
                direction: "none",
                random: false,
                straight: false,
                outMode: "destroy",
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detectsOn: "window",
            events: {
                onhover: {
                    enable: true,
                    mode: "trail"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 200
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                },
                trail: {
                    delay: 0.005,
                    quantity: 5
                }
            }
        },
        retina_detect: true,
        background: {
            color: "#000000",
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover"
        }
    }
    const tabs = {
        "addTime": "最新文章",
        "praise": "最受欢迎",
        "commentCount": "评论最多"
    }


    // function
    // 搜索
    const searchData = (search) => {
        console.log('2222', search)
        setMylist(search?.data)
    }

    // tabs栏切换
    const tabsChange = async (tab) => {
        const res = await axios(`${servicePath.getArticleList}${tab}`)
        setMylist(res.data.data)
        setTabLeft(tabs[tab])
    }
    // 点赞
    const changType = (e) => {
        const { id, praise } = e.target.value
        if (!praise) {
            return
        }
        const giveGood = async (id, praise) => {
            await axios(`${servicePath.giveGood}${id}/${praise}`)
        }
        // 深拷贝,setMYlist(mylist)不会刷新页面
        const mylist2 = JSON.parse(JSON.stringify(mylist))
        mylist2.map((item) => {
            if (item.id === id) {
                item.praise++
                console.log('item', item)
            }
        })
        giveGood(id, praise)
        setMylist(mylist2)
    }



    //---------主要代码-------------end
    return (
        <div>
            <Particles
                id="tsparticles"
                className="particles"
                options={config}
                style={{ position: "absolute" }}
            />
            <Head>
                <title>Home</title>
            </Head>
            <Header searchData={(data) => searchData(data)} />
            <Carousel effect="fade" autoplay >
                <div className="Carousel">
                    <img src="../static/img/node.jpg" alt="" />
                </div>
                <div className="Carousel">
                    <img src="../static/img/vue.jpg" alt="" />
                </div>
                <div className="Carousel">
                    <img src="../static/img/react.png" alt="" />
                </div>
            </Carousel>
            <Row className="comm-main" type="flex" justify="center">
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
        </div>
    )
}
Home.getInitialProps = async () => {
    const res = await axios(servicePath.getArticleList + 'addTime')
    return res.data
}


export default Home
