import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon, Switch, Input, Dropdown, Button, Popover, Card, message } from 'antd'

const { Search } = Input;

import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = (props) => {
    const [navArray, setNavArray] = useState([])
    const [theme, setTheme] = useState('light')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDetail, setIsDetail] = useState('')
    const [content, setContent] = useState('')

    const checkLogin = () => {
        setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        } else if (!password) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                setIsLoading(false)
                if (res.data.data === '登录成功') {
                    window.localStorage.setItem('openId', res.data.openId)
                    console.log('res.data.openId', localStorage)
                    props.history.push('/index')
                } else {
                    message.error('用户名密码错误')
                }
            }
        )

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }


    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://reactjs.bootcss.com/docs/getting-started.html" >
                    react
      </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://nodejs.org/zh-cn" >
                    node
      </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://cn.vuejs.org/" >
                    vue
      </a>
            </Menu.Item>
        </Menu>
    )


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
        setIsDetail(window.location.pathname)
    }, [])
    //跳转到列表页
    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/index')
        } else if (e.key == 1) {
            Router.push('/video?id=' + e.key)
        } else {
            Router.push('/messageBoard')

        }
    }

    const onSearch = (value) => {
        console.log('value', value)
        const Search = async (value) => {
            await axios(servicePath.getListSearch + value).then(
                (res) => { props.searchData(res.data) }

            )
        }
        Search(value)
        setContent('')
    }



    return (
        <div className="header" style={{ backgroundColor: isDetail !== '/detailed' ? 'rgba(52, 52, 52, 0.5)' : 'rgb(0, 21, 41)' }}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={13} xl={8}>
                    <span className="header-logo">
                        <Link href={{ pathname: '/index' }}>
                            <a> 博客&nbsp;<span style={{ color: '#fff' }}>技术栈</span></a>
                        </Link>

                    </span>
                    <span className="header-txt">专注前端开发。</span>
                </Col>
                <Col xs={24} sm={24} md={10} lg={13} xl={6}>

                    <Search
                        placeholder="搜索,如: react, vue, node"/*  */
                        onSearch={onSearch}
                        onChange={(e) => { setContent(e.target.value) }}
                        value={content}
                        enterButton
                        style={{ width: 200, height: 30, marginTop: 3, display: isDetail === '/detailed' || isDetail === '/messageBoard' ? 'none' : '' }}
                    />
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={7}>
                    <Menu
                        mode="horizontal"
                        onClick={handleClick}
                        theme={"dark"}
                    >

                        <Menu.Item key="0">
                            <Icon type="home" />
                            博客首页
                        </Menu.Item>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                技术栈分类 <Icon type="down" />
                            </a>
                        </Dropdown>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        <Icon type={item.icon} />
                                        <span color>{item.typeName}</span>
                                    </Menu.Item>
                                )
                            })
                        }

                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header
