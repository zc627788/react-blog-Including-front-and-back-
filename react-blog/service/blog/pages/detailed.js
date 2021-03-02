import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Icon, Breadcrumb, Button, Comment, Avatar, Form, List, Input, Rate } from 'antd'
import moment from 'moment';

import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import marked from 'marked'
import hljs from "highlight.js";
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'
import 'highlight.js/styles/monokai-sublime.css';
import '../static/style/pages/detailed.css'


const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
      </Button>
        </Form.Item>
    </div>
);


const Detailed = (props) => {

    // props
    const { addTime, article_content, typeName, view_count, title } = props


    //state
    const [comments, setComments] = useState([{}])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')


    const tocify = new Tocify()
    const renderer = new marked.Renderer();




    const handleSubmit = () => {
        if (!value) {
            return;
        }
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setValue('')
            setComments([
                {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                },
                ...comments,
            ])
        }, 1000);

    };
    const handleChange = e => {
        setValue(e.target.value)

    };


    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    let html = marked(article_content)






    return (
        <>
            <Head>
                <title>博客详细页</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col xs={24} sm={24} md={16} lg={18} xl={2}>
                    <div style={{ position: "relative", top: "200px" }}>
                        <Button size="large" shape="circle" style={{ position: "relative" }}  ><Rate character={<Icon type="like" />} count='1' /></Button>
                        <p style={{ margin: '0 0 30px 11px' }} >赞</p>
                        <div><a href="#comment" ><Button shape="circle" icon="folder" size="large"></Button></a></div>
                        <p style={{ margin: '0 0 30px 7px' }} >评论</p>
                    </div>
                </Col>
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className="detailed-title">{title}</div>
                            <div className="list-icon center">
                                <span><Icon type="calendar" /> {addTime}</span>
                                <span><Icon type="folder" /> {typeName}</span>
                                <span><Icon type="fire" /> {view_count}</span>
                            </div>
                            <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}></div>
                        </div>
                    </div>

                    <div>
                        {comments.length > 0 && <CommentList comments={comments} />}
                        <Comment id="comment"
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <Editor
                                    onChange={(e) => handleChange(e)}
                                    onSubmit={handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    {/* 个人信息 */}
                    <Author />
                    {/* 广告 */}
                    <Advert />
                    {/* 目录 */}
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <div className="toc-list">
                                {tocify && tocify.render()}
                            </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer />
        </>
    )
}

Detailed.getInitialProps = async (context) => {
    let id = context.query.id
    const promise = new Promise((resolve) => {

        axios(servicePath.getArticleById + id).then(
            (res) => {
                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}

export default Detailed
