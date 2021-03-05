import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Comment, Divider, Button, Card, message, Tooltip, Input, notification, Tag, Spin, Pagination, Empty } from 'antd'
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
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Particles from "react-tsparticles";


BraftEditor.use(CodeHighlighter({}))

const TextArea = Input.TextArea

function createMarkup(html) {
    return { __html: html };
}

const styles = {
    actionItem: {
        fontSize: 14
    }
}

const messageBoard = (list = []) => {
    // state
    const [state, setState] = useState({
        editorState: BraftEditor.createEditorState(null),   //留言内容
        messages: [],   //留言列表
        isShowEditor: false,
        replyPid: '',//回复第几条的父级id
        replyContent: '',  //回复内容
        replyUser: '', //回复的对象
        expandIds: [],  //展开的id列表
        placeholder: '',  //回复的placeholder
        loading: false,
        pagination: {
            total: 100,
            current: 1,  //前台分页是从1开始的，后台分页是从0开始的，所以要注意一下
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true
        },
    })

    const controls = ['undo', 'redo', 'clear', 'separator', 'bold', 'text-color', 'blockquote', 'code', 'emoji', 'separator', 'link', 'separator', 'media']
    const config = {
        fpsLimit: 60,
        background: {
            color: "#0b032d"
        },
        backgroundMode: {
            enable: true
        },
        particles: {
            color: {
                value: ["#f67e7d", "#843b62", "#621940"]
            },
            links: {
                color: "#ffb997",
                enable: true
            },
            move: {
                enable: true,
                speed: 6
            },
            size: {
                value: 5,
                random: {
                    enable: true,
                    minimumValue: 1
                },
                animation: {
                    enable: true,
                    speed: 2.5,
                    minimumValue: 1
                }
            },
            opacity: {
                value: 0.8,
                random: {
                    enable: true,
                    minimumValue: 0.4
                }
            }
        }
    }

    // effect
    useEffect(() => {
        getMessages()
    }, [])


    // function
    const getMessages = async (page = 1, pageSize = 10) => {
        setState({
            ...state,
            loading: true
        })
        const res = await axios.get(`${servicePath.message}${page - 1}/${pageSize}`)

        if (res.status !== 200) {
            setState({
                ...state,
                loading: false,
            })
            return
        }
        setState({
            ...state,
            messages: res.data.list || [],
            loading: false,
            isShowEditor: false,
            editorState: ContentUtils.clear(state.editorState),
            replyPid: '',
            replyContent: '',
            replyUser: '',
            placeholder: '',
            pagination: {
                ...state.pagination,
                total: res.data.total,
                current: page,
                pageSize
            }
        })
    }
    //留言用户Input的onChange
    const handleUsernameChange = (yourName) => {
        const { value } = yourName.target
        setState({
            ...state,
            replyUser: value
        })
    }

    //留言输入框的onChange
    const handleMessageChange = (editorState) => {
        setState({
            ...state,
            editorState
        })
    }

    //取消留言框 清空留言框
    const clearContent = () => {
        setState({
            ...state,
            isShowEditor: false,
            editorState: ContentUtils.clear(state.editorState)
        })
    }

    // 留言
    const sendMessage = async () => {
        const { editorState, replyUser } = state
        if (!replyUser) {
            message.warning('请输入用户名')
            return
        }
        if (editorState.isEmpty()) {
            message.warning('请先输入内容')
            return
        }
        const htmlContent = state.editorState.toHTML()
        const res = await axios.post(`${servicePath.sendMessage}`, {
            username: state.replyUser,
            content: htmlContent,
 
        })
        console.log('res', res)
        if (res.status === 200) {
            message.success('留言成功')
            getMessages()
            clearContent()

        }
    }

    /**
     * 展开回复的textarea
     * @param {object} item 当前回复的对象
     * @param {number} pid  回复的父级id
     */
    const showReply = (item, pid) => {
        setState({
            ...state,
            replyPid: pid,
            replyContent: '',
            // replyUser: item,
            // placeholder: `${props.user.username} @ ${item.userName}`
        })
    }

    //关闭回复的texttarea
    const closeReply = () => {
        setState({
            ...state,
            replyPid: '',
            replyContent: '',
            replyUser: '',
            placeholder: ''
        })
    }

    //确认回复
    const confirmReply = async (item) => {
        console.log('item',item.userName)
        const {replyContent,replyUser} = state
        if(!replyUser){
            message.warning('请输入用户名')
            return
        }
        if (!replyContent) {
            message.warning('请输入回复内容')
            return
        }
        const param = {
            content: replyContent,
            type: 1,
            pid: state.replyPid,
            replyUser: state.replyUser,
            targetName:item.userName
        }
        const res = await axios.post(`${servicePath.reply}`, param)
        if (res.status === 200) {
            message.success('回复成功')
            closeReply()
            const { current, pageSize } = state.pagination
            getMessages(current, pageSize)
            if (!state.expandIds.includes(item.id)) {
                setState({
                    expandIds: [...state.expandIds, item.id]
                })
            }
        }
    }
    // 随机颜色
    const getRandomColor = function () {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    //删除回复
    // const onDelete = async (item) => {
    //     Modal.confirm({
    //         title: '提示',
    //         content: `确认删除该留言${item.children && item.children.length ? '及其底下的回复' : ''}吗？`,
    //         onOk: async () => {
    //             const res = await json.post('/message/delete', {
    //                 id: item.id
    //             })
    //             if (res.status === 0) {
    //                 notification.success({
    //                     message: '删除成功',
    //                     description: res.message,
    //                     duration: 3
    //                 });
    //                 const { current, pageSize } = state.pagination
    //                 getMessages(current, pageSize)
    //             }
    //         },
    //     });
    // }

    //回复输入框的onChange
    const handleReplyChange = (e) => {
        setState({
            ...state,
            replyContent: e.target.value
        })
    }

    //折叠回复
    const foldReply = (item) => {
        const list = state.expandIds.slice()
        const index = list.findIndex(i => i === item.id)
        list.splice(index, 1)
        setState({
            ...state,
            expandIds: list
        })
    }

    //展开回复
    const expandReply = (item) => {
        setState({
            ...state,
            expandIds: [state.expandIds, item.id]
        })
    }

    //点击赞
    const onLike = () => {
        notification.warning({
            message: '提示',
            description: '暂不支持点赞功能',
            duration: 3,
            // icon: <Icon type="smile" />,
        });
    }

    const renderActions = (item, pid) => {
        let actions = [
            <span>
                <Tooltip title="回复时间">
                    {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </Tooltip>
            </span>,
            <span style={styles.actionItem}>
                <Tooltip title="赞">
                    <span onClick={onLike}>
                        <Icon type="like" />&nbsp;赞
                    </span>
                </Tooltip>
            </span>,
            <span style={styles.actionItem}>
                <Tooltip title="回复">
                    <span onClick={() => showReply(item, pid)}>
                        <span className='iconfont icon-commentoutline my-iconfont' />&nbsp;回复
                   </span>
                </Tooltip>
            </span>
        ]
        //只有小可爱或者本人才可删除
        // if (props.user.isAdmin || props.user.id === item.userId) {
        //     actions.splice(2, 0, (
        //         <span style={styles.actionItem}>
        //             <Tooltip title="删除">
        //                 <span onClick={() => onDelete(item)}>
        //                     <Icon type="delete" />&nbsp;删除
        //                 </span>
        //             </Tooltip>
        //         </span>
        //     ))
        // }
        return actions
    }

    const pageChange = (page) => {
        getMessages(page, state.pagination.pageSize)
    }

    const pageSizeChange = (current, size) => {
        getMessages(1, size)
    }


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <Particles
                id="tsparticles"
                className="particles"
                options={config}
                style={{ position: "absolute" }}
            />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <Breadcrumb style={{ margin: '20px 0 0 10px' }}>
                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                        <Breadcrumb.Item>留言板</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24 }}>
                        <Card bordered={false} bodyStyle={{ paddingTop: 0 }}>
                            <div>
                                {
                                    state.isShowEditor ? (
                                        <div style={{ marginTop: 10 }}>
                                            <div className="editor-wrapper">
                                                <Input
                                                    placeholder="请输入你的用户名"
                                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    suffix={
                                                        <Tooltip title="必须输入">
                                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                        </Tooltip>
                                                    }
                                                    onChange={handleUsernameChange}
                                                />
                                                <BraftEditor
                                                    controls={controls}
                                                    contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                                                    value={state.editorState}
                                                    onChange={handleMessageChange}
                                                />
                                            </div>
                                            <Button type='primary' onClick={sendMessage}>发表</Button>&emsp;
                                            <Button onClick={clearContent}>取消</Button>
                                        </div>
                                    ) : <Button onClick={() => setState({ ...state, isShowEditor: true })}>我要留言</Button>
                                }
                            </div>
                            <Divider />
                            <Spin spinning={state.loading} style={{ position: 'fixed', top: '50%', left: '50%' }} />
                            {console.log('object', state.messages)}
                            <div className='message-list-box'>
                                {
                                     state.messages&&state.messages.length!==0 ? state.messages.map((item, index) => (
                                        <Comment
                                            key={item.id}
                                            author={<span style={{ fontSize: 16 }}>{item.userName} {item.userIsAdmin === 1 && <Tag color={getRandomColor()}>小可爱</Tag>}</span>}
                                            avatar={<img className='avatar-img' src={item.userAvatar} alt='avatar' />}
                                            content={<div className='info-box braft-output-content' dangerouslySetInnerHTML={createMarkup(item.content)} />}
                                            actions={renderActions(item, item.id)}
                                            datetime={`第${state.pagination.total - (state.pagination.current - 1) * state.pagination.pageSize - index}楼`}
                                        >
                                            {console.log('object', state.expandIds)}
                                            {item.children.slice(0, state.expandIds.includes(item.id) ? item.children.length : 1).map(i => (
                                                <Comment
                                                    key={i.id}
                                                    author={<span style={{ fontSize: 15 }}>{i.userName} {i.userIsAdmin === 1 && <Tag color={getRandomColor()}>小可爱</Tag>} @ {i.targetUserName} {i.targetUserIsAdmin === 1 && <Tag color={getRandomColor()}>小可爱</Tag>}</span>}
                                                    avatar={<img className='avatar-img-small' src={i.userAvatar} alt='avatar' />}
                                                    content={<div className='info-box' dangerouslySetInnerHTML={createMarkup(i.content)} />}
                                                    // actions={renderActions(i, item.id)}
                                                />
                                            ))}
                                            <div className='toggle-reply-box' style={{ display: item.children.length > 1 ? 'block' : 'none' }}>
                                                {
                                                    state.expandIds.includes(item.id) ? (
                                                        <span onClick={() => foldReply(item)}>收起全部{item.children.length}条回复 <Icon type='up-circle' /></span>
                                                    ) : (
                                                            <span onClick={() => expandReply(item)}>展开全部{item.children.length}条回复 <Icon type="down-circle" /></span>
                                                        )
                                                }
                                            </div>
                                            {state.replyPid === item.id && (
                                                <div style={{ width: '70%', textAlign: 'right' }}>
                                                    <Input
                                                        placeholder="请输入你的用户名"
                                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                        suffix={
                                                            <Tooltip title="必须输入">
                                                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                            </Tooltip>
                                                        }
                                                        onChange={handleUsernameChange}
                                                    />
                                                    <TextArea rows={4} style={{ marginBottom: 10 }} value={state.replyContent} onChange={handleReplyChange} placeholder={state.placeholder} />
                                                    <Button size='small' onClick={closeReply}>取消</Button>&emsp;
                                                    <Button size='small' type='primary' onClick={() => confirmReply(item)}>回复</Button>
                                                </div>
                                            )}
                                        </Comment>
                                    ))
                                :<Empty description="暂无留言" />}
                            </div>
                            <Pagination {...state.pagination} onChange={pageChange} onShowSizeChange={pageSizeChange} />
                        </Card>
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


export default messageBoard
