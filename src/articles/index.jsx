import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import ArticleList from './list.jsx'
import EditArticle from './editArticle.jsx'

class ArticleIndex extends React.Component {

    render() {
        console.log(this.props.history)
        console.log(this.props.match)
        const { match, history } = this.props;
        return (
            <div>
                <Route exact path={match.url} component={ArticleList} />
                <Route path={`${match.url}/edit`} component={EditArticle} />
            </div>
        )
    }
}


export default ArticleIndex;
