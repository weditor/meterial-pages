import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MirrorEditor from './editor.jsx'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider } from "@material-ui/core";
// import TagSlector from "./tag.jsx"
import TagSlector from "./tag.jsx"


const styles = theme => ({
    headerInput: {
        marginBottom: theme.spacing.unit,
        fontSize: "x-large",
    },
    saveButton: {
        margin: theme.spacing.unit,
        float: "right",
    },
    backButton: {
        fontSize: "small",
        marginBottom: "10px",
    },
    bottomInput: {
        margin: "10px",
    }
})


class EditArticle extends React.Component {
    constructor(props) {
        super(props);
        this.content = "";
        this.state = {
            title: "",
            content: "",
            is_private: false,
            multi: null,
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
        console.log( this.state.is_private)
        if (!this.blogId()) {
            this.props.api.addBlog(this.state.title, this.content, this.state.is_private)
                .then(js => {
                    console.log(js);
                    this.setState({ title: js.title, content: js.content, is_private: js.is_private});
                })
        }
        else {
            this.props.api.updateBlog(this.blogId(), this.state.title, this.content, this.state.is_private)
                .then(js => {
                    console.log(js);
                    this.setState({ title: js.title, content: js.content, is_private: js.is_private});
                })
        }
    }

    onChange(value) {
        this.content = value
    }

    handleChange = name => value => {
        this.setState({
          [name]: value,
        });
      };

    render() {
        const { classes, theme  } = this.props;
        // console.log(this.state.content)
        const selectStyles = {
            input: base => ({
              ...base,
              color: theme.palette.text.primary,
              '& input': {
                font: 'inherit',
              },
            }),
          };
        return (
            <div>
                <Button className={classes.backButton} variant="contained" size="small" color="primary" 
                    onClick={() => this.props.history.goBack()} >
                    <ArrowBackIcon fontSize="small"/>
                    返回
                </Button>
                <TextField fullWidth label="标题"
                    className={classes.headerInput}
                    InputProps={{ className: classes.headerInput }}
                    value={this.state.title}
                    onChange={e=>this.setState({title: e.target.value})}
                ></TextField>
                <MirrorEditor value={this.state.content} onChange={value => this.onChange(value)} />
                <Divider />
                <TagSlector api={this.props.api}/>
                <FormGroup row>
                    <Button variant="fab" color="primary" aria-label="保存" className={classes.saveButton} onClick={()=>this.saveArticle()}>
                        <SendIcon />
                    </Button>
                    <FormControlLabel
                        className={classes.bottomInput}
                        control={
                            <Checkbox
                                checked={this.state.is_private}
                                onChange={e=>this.setState({is_private: e.target.checked})}
                                value="checkedA"
                            />
                        }
                        label="不公开"
                    />
                </FormGroup>
            </div>
        )
    }
}


export default withStyles(styles)(EditArticle);
