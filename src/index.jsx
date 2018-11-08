import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArticleIndex from "./articles/index.jsx";
import ApiManager from "./ApiManager.jsx";
import { withProps } from "./lib.jsx"


const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

class ButtonAppBar extends React.Component {
    constructor(props) {
        super(props);
    }

    enterApp(name) {
        this.props.history.push(name);
    }

    goLoginPage() {
        this.props.history.push("/api_auth/login/");
    }

    renderAccount() {
        console.log(this.props.api)
        if (!this.props.api.is_authenticated()) {
            return <Button color="inherit" onClick={this.goLoginPage}>Login</Button>
        }
        else {
            return <Button color="inherit">{this.props.api.username()}</Button>
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            News
                            <Button color="inherit" onClick={()=>this.enterApp("/blog")}>Blog</Button>
                        </Typography>
                        <Button color="inherit" onClick={()=>this.enterApp("/topics")}>topics</Button>
                        {this.renderAccount()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

let MyAppBar = withStyles(styles)(ButtonAppBar);

class BasicExample extends React.Component {
    apiManager = new ApiManager();

    render() {
        let comProps = withProps({ api: this.apiManager });
        return (
            <Router>
                <div>
                    {/* <Route path="/" component={(...props) => (<MyAppBar api={this.apiManager} {...props} />)} /> */}
                    <Route path="/" component={comProps(MyAppBar)} />
                    <Route exact path="/" component={Topics} />
                    <Route path="/blog" component={comProps(ArticleIndex)} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} />
                </div>
            </Router>
        );
    }
}

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route exact path={match.url} render={() => <h3>Please select a topic.</h3>} />
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

ReactDOM.render(<BasicExample />, document.getElementById("root"));
