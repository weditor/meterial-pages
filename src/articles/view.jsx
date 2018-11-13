import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MirrorEditor from "./editor.jsx";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MarkdownIt from "markdown-it";
import "./view.css"


const styles = theme => ({
    headerInput: {
        marginBottom: theme.spacing.unit,
        fontSize: "x-large",
        color: "black"
    },
    editBtn: {
        // paddingTop: "5px",
        padding: "7px",
        margin: "0px"
    }
});

class ViewArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            showEdit: false,
        };
        this.md = MarkdownIt();
    }

    blogId() {
        return this.props.match.params.blog_id;
    }

    componentDidMount() {
        this.props.api.getBlog(this.blogId()).then(js => {
            console.log(js);
            this.setState({ title: js.title, content: js.content });
        });
    }

    editArticle() {
        this.props.history.push(this.props.match.url.replace('view', 'edit'));
    }

    mdBuilded(dom) {
        this.dom = dom;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                
                <h1 id="article-title">
                    <Button variant="outlined" size="small" color="inherit"
                        onClick={() => this.props.history.push('/blog')}
                    >返回</Button>
                    <span>{this.state.title}</span>
                    <span className="edit_btn_wrapper">
                        <IconButton onClick={()=>this.editArticle()} className={classes.editBtn} color="primary">
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </span>
                </h1>
                
                <Divider light />
                <div
                    ref={dom => this.mdBuilded(dom)}
                    dangerouslySetInnerHTML={{
                        __html: this.md.render(this.state.content)
                    }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ViewArticle);
