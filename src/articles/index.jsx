import React from 'react'
import PropType from 'prop-types'
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {BrowserRouter, Route} from 'react-router-dom'
import ArticleList from './list.jsx'
import EditArticle from './editArticle.jsx'
import ViewArticle from './view.jsx'
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
        let url_prefix = match.url;
        if (url_prefix.endsWith("/")) {
            url_prefix = url_prefix.substring(0, url_prefix.length-1);
        }

        return (
            // <Paper className={classes.content}>
            <div>
                <Route exact path={match.url} component={comProps(ArticleList)} />
                <Route exact path={`${url_prefix}/edit`} component={comProps(EditArticle)} />
                <Route path={`${url_prefix}/edit/:blog_id`} component={comProps(EditArticle)} />
                <Route path={`${url_prefix}/view/:blog_id`} component={comProps(ViewArticle)} />
            </div>
            // </Paper>
        )
    }
}


export default withStyles(styles)(ArticleIndex);
