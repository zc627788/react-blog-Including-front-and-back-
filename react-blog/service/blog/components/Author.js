import { Avatar, Divider, Tooltip } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} /></div>
            <div className="author-introduction">
                ZZC程序员，毕业设计呀!!!!!!!!
                <Divider style={{color:'#fff'}}>社交账号</Divider>
                <Tooltip title="zc627788">
                    <Avatar size={28} icon="github" className="account" >

                    </Avatar></Tooltip>
                <Tooltip title="1455208792">
                    <Avatar size={28} icon="qq" className="account" >
                    </Avatar></Tooltip>
                <Tooltip title="13692509104">
                    <Avatar size={28} icon="wechat" className="account" >
                    </Avatar>
                </Tooltip>
            </div>
        </div >
    )
}

export default Author
