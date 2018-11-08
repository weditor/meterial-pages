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
    // content: {
    //     margin: theme.spacing.unit * 2,
    //     padding: theme.spacing.unit * 2
    // },
    headerInput: {
        marginBottom: theme.spacing.unit ,
        fontSize: "x-large",
    },
    button: {
        margin: theme.spacing.unit,
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

    saveArticle() {
        this.props.api.addBlog(this.state.title, this.content)
            .then(js => {
                console.log(js);
                this.setState({ title: js.title, content: js.content });
            })
    }

    onChange(value) {
        this.content = value
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField fullWidth label="标题"
                    className={classes.headerInput}
                    InputProps={{ className: classes.headerInput }}
                    value={this.state.title}
                    onChange={e=>this.setState({title: e.target.value})}
                ></TextField>
                <MirrorEditor onChange={value=>this.onChange(value)}/>
                <Button variant="fab" color="primary" aria-label="保存" className={classes.button} onClick={()=>this.saveArticle()}>
                    <SendIcon />
                </Button>
            </div>
        )
    }
}


export default withStyles(styles)(EditArticle);
