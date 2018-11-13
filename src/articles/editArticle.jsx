import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MirrorEditor from './editor.jsx'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    headerInput: {
        marginBottom: theme.spacing.unit,
        fontSize: "x-large",
    },
    button: {
        margin: theme.spacing.unit,
    },
    backButton: {
        float: "right",
    }
})

class EditArticle extends React.Component {
    constructor(props) {
        super(props);
        this.content = "";
        this.state = {
            title: "",
            content: "",
        }
    }

    componentDidMount() {
        this.loadArticle()
    }

    loadArticle() {
        if (!this.blogId()) {
            return;
        }
        this.props.api.getBlog(this.blogId()).then(js=>this.setState({title: js.title, content: js.content}))
    }

    blogId() {
        return this.props.match.params.blog_id;
    }

    saveArticle() {
        if (!this.blogId()) {
            this.props.api.addBlog(this.state.title, this.content)
                .then(js => {
                    console.log(js);
                    this.setState({ title: js.title, content: js.content });
                })
        }
        else {
            this.props.api.updateBlog(this.blogId(), this.state.title, this.content)
                .then(js => {
                    console.log(js);
                    this.setState({ title: js.title, content: js.content });
                })
        }
    }

    onChange(value) {
        this.content = value
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.content)
        return (
            <div>
                <Button className={classes.backButton} variant="outlined" size="small" color="inherit"
                    onClick={() => this.props.history.goBack()} >返回</Button>
                <TextField fullWidth label="标题"
                    className={classes.headerInput}
                    InputProps={{ className: classes.headerInput }}
                    value={this.state.title}
                    onChange={e=>this.setState({title: e.target.value})}
                ></TextField>
                <MirrorEditor value={this.state.content} onChange={value => this.onChange(value)} />
                <TextField label="是否私密"></TextField>
                <TextField label="标签"></TextField>
                <Button variant="fab" color="primary" aria-label="保存" className={classes.button} onClick={()=>this.saveArticle()}>
                    <SendIcon />
                </Button>
            </div>
        )
    }
}


export default withStyles(styles)(EditArticle);
