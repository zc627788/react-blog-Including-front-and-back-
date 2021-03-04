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
import Particles from "react-tsparticles";
const { TabPane } = Tabs;

const video = (list) => {
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
                value: 50,
                random: {
                    enable: true,
                    minimumValue: 10
                },
                animation: {
                    enable: true,
                    speed: 5,
                    minimumValue: 10,
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
                speed: 10,
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
            image: "url('https://newevolutiondesigns.com/images/freebies/4k-wallpaper-1.jpg')",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover"
        },
        backgroundMask: {
            enable: true,
            cover: {
                color: "#000000"
            }
        }
    }
    const tabs = {
        addTime: "最新文章",
        praise: "最受欢迎",
        commentCount: "评论最多"
    }

    // effect
    useEffect(() => {
        setMylist(list.data)
    }, [])

    function findKey(obj, value, compare = (a, b) => a === b) {
        return Object.keys(obj).find(k => compare(obj[k], value))
    }


    // function
    // 搜索
    const searchData = (search) => {
        setMylist(search?.data)
    }

    // tabs栏切换
    const tabsChange = async (tab) => {
        let id = window.location.search.split('=')[1]
        const res = await axios(`${servicePath.getListById}${id}/${tab}`)
        setMylist(res.data.data)
        setTabLeft(tabs[tab])

    }
    // 点赞
    const changType = (e) => {
        const { id, praise } = e.target.value
        let type_id = window.location.search.split('=')[1]
        if (!praise) {
            return
        }
        const giveGood = async (id, praise) => {
            await axios(`${servicePath.giveGood}${id}/${praise}`)
            const res = await axios(`${servicePath.getListById}${type_id}/${findKey(tabs, tabLeft)}`)
            setMylist(res.data.data)
        }
        giveGood(id, praise)


    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Particles
                id="tsparticles"
                className="particles"
                options={config}
                style={{ position: "absolute" }}
            />
            <Header searchData={(data) => searchData(data)} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-leftList2List2" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <List
                            itemLayout="vertical"
                            header={
                                <div className="tabFlex">
                                    <span>
                                        <Breadcrumb >
                                            <Breadcrumb.Item ><a style={{ color: '#fff' }} href="/">首页&nbsp;&nbsp;&nbsp;/</a></Breadcrumb.Item>
                                            <Breadcrumb.Item style={{ color: '#fff' }}>视频教程</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </span>
                                    <Tabs defaultActiveKey="1" className="Tabs" style={{ color: '#fff' }} onChange={tabsChange} >
                                        <TabPane tab="最新" key="addTime" >
                                        </TabPane>
                                        <TabPane tab="最受欢迎" key="praise">
                                        </TabPane>
                                        <TabPane tab="最多观看" key="commentCount">
                                        </TabPane>
                                    </Tabs>
                                </div>
                            }
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                            <a style={{ color: '#fff' }}>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><Icon type="calendar" />{item.addTime}</span>
                                        <span><Icon type="folder" /> {item.typeName}</span>
                                        <span><Icon type="fire" />  {item.view_count}人</span>
                                    </div>
                                    <div className="list-context">{item.introduce}</div>
                                    <Radio.Group style={{ margin: "10px 0 0 10px" }} onChange={changType}>
                                        <Radio.Button value={item}><Icon type="like" />&nbsp;{item.praise}</Radio.Button>
                                        <Radio.Button value={item.commentCount}><Icon type="message" /> &nbsp;{item.commentCount}</Radio.Button>
                                    </Radio.Group>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>

                <Col className="comm-rightList2" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert />
                </Col>
            </Row>
            <Footer />

        </>
    )

}


video.getInitialProps = async (context) => {
    let id = context.query.id
    const res = await axios(servicePath.getListById + id + '/' + 'addTime')
    return res.data
}

export default video
