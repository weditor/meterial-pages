import React from 'react'
import PropType from 'prop-types'
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {BrowserRouter, Route} from 'react-router-dom'
import ArticleList from './list.jsx'
import EditArticle from './editArticle.jsx'
import { withProps } from "../lib.jsx"


const styles = theme => ({
    content: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2
    },
})


class ArticleIndex extends React.Component {

    render() {
        const { match, history, classes } = this.props;
        const comProps = withProps({api: this.props.api})
        let edit_url = `${match.url}/edit`;
        if (match.url.endsWith("/")) {
            edit_url = `${match.url}edit`;
        }

        return (
            <Paper className={classes.content}>
                <Route exact path={match.url} component={comProps(ArticleList)} />
                <Route path={edit_url} component={comProps(EditArticle)} />
            </Paper>
        )
    }
}


export default withStyles(styles)(ArticleIndex);
