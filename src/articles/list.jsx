import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";

const rows = [
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "标题"
    },
    {
        id: "create_time",
        numeric: true,
        disablePadding: false,
        label: "创建时间"
    }
];

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
    },
    button: {
        margin: theme.spacing.unit
    }
});

class EnhancedTable extends React.Component {
    state = {
        articles: [],
        page: 0,
        rowsPerPage: 5
    };

    url_prefix = this.props.match.url.endsWith("/")
        ? this.props.match.url
        : this.props.match.url + "/";

    handleClick = (event, id) => {
        console.log(id);
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles() {
        this.props.api.listBlog().then(js => {
            this.setState({ articles: js.results });
        });
    }

    createArticle() {
        const { history, match } = this.props;
        history.push(this.url_prefix + "edit");
    }

    viewArticle(blog_id) {
        const { history, match } = this.props;
        history.push(`${this.url_prefix}view/${blog_id}`);
    }

    render() {
        const { classes } = this.props;
        const { articles, rowsPerPage, page } = this.state;
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, articles.length - page * rowsPerPage);

        return (
            <div>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                    >
                        <TableHead>
                            <TableRow>
                                {rows.map(row => {
                                    return <TableCell key={row.id}>{row.label}</TableCell>;
                                }, this)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.articles.map(n => {
                                return (
                                    <TableRow
                                        hover
                                        onClick={() => this.viewArticle(n.id)}
                                        tabIndex={-1}
                                        key={n.id}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="default"
                                        >
                                            {n.title}
                                        </TableCell>
                                        <TableCell>{n.create_time}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={articles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />

                <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    className={classes.button}
                    onClick={() => this.createArticle()}
                >
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
