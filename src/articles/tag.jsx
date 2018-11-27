import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import { debounce } from "lodash";
import keycode from "keycode";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    // console.log(inputProps)
    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput
                },
                ...InputProps
            }}
            {...other}
        />
    );
}


class DownshiftMultiple extends React.Component {
    tag_input = "";
    searchTag = debounce(this.loadTag, 500);
    state = {
        inputValue: "",
        selectedItem: [],
        suggestions: []
    };

    componentWillReceiveProps(props) {
        if (props != this.props) {
            this.setState({ selectedItem: props.selected })
        }
    }

    renderSuggestion({
        suggestion,
        index,
        itemProps,
        highlightedIndex,
        selectedItem
    }) {
        const isHighlighted = highlightedIndex === index;
        const isSelected = (selectedItem.map(s=>s.name) || []).indexOf(suggestion.name) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.id}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 800 : 400
                }}
                // onClick={()=>this.addTag()}
            >
                {suggestion.type == 2 && "新建: "}{suggestion.name}
            </MenuItem>
        );
    }

    handleKeyDown = event => {
        const { inputValue, selectedItem } = this.state;
        if (
            selectedItem.length &&
            !inputValue.length &&
            keycode(event) === "backspace"
        ) {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1)
            });
        }
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
        this.searchTag()
    };

    handleChange = item => {
        console.log("select")
        console.log(item)
        let { selectedItem } = this.state;

        if (selectedItem.map(s=>s.name).indexOf(item.name) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.setState({
            inputValue: "",
            selectedItem
        }, this.onChange);
    };

    handleDelete = item => () => {
        this.setState(state => {
            const selectedItem = [...state.selectedItem];
            selectedItem.splice(selectedItem.indexOf(item), 1);
            return { selectedItem };
        }, this.onChange);
    };

    // handleChange(item) {
    //     // if (item.type == 2) {
    //     //     this.props.api.addTag(item.name, false).then(tag => {
    //     //         this.handleChange1(tag)
    //     //     });
    //     // } else {
    //         this.handleChange1(item)
    //     // }
        
    // }

    onChange() {
        if (!this.props.onChange) {
            return;
        }
        this.props.onChange(this.state.selectedItem);
    }

    suggestions() {
        let suggestions2 = this.state.suggestions.slice();
        suggestions2.push({
            id: "",
            name: this.state.inputValue,
            pinyin: "",
            type: 2
        });
        return suggestions2;
    }

    filterOption(option, rawInput) {
        return true;
    }

    loadTag() {
        if (!this.state.inputValue) {
            this.setState({ suggestions: [] });
        }
        else {
            this.props.api
                .listTag(this.state.inputValue, 0, 0)
                .then(js => this.setState({ suggestions: js.results }));
        }
    }

    render() {
        const { classes } = this.props;
        const { inputValue, selectedItem } = this.state;
        console.log(this.props)
        return (
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={(item)=>this.handleChange(item)}
                selectedItem={selectedItem}
            >
                {({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue: inputValue2,
                    selectedItem: selectedItem2,
                    highlightedIndex
                }) => (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            InputProps: getInputProps({
                                startAdornment: selectedItem.map(item => (
                                    <Chip
                                        key={item.id}
                                        tabIndex={-1}
                                        label={item.name}
                                        className={classes.chip}
                                        onDelete={this.handleDelete(item)}
                                    />
                                )),
                                onChange: this.handleInputChange,
                                onKeyDown: this.handleKeyDown,
                                placeholder: "Select multiple countries"
                            }),
                            label: "Label"
                        })}
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {this.suggestions().map((suggestion, index) =>
                                    this.renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({
                                            item: suggestion
                                        }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2
                                    })
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )}
            </Downshift>
        );
    }
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250
    },
    container: {
        flexGrow: 1,
        position: "relative"
    },
    paper: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    inputRoot: {
        flexWrap: "wrap"
    },
    inputInput: {
        width: "auto",
        flexGrow: 1
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

export default withStyles(styles)(DownshiftMultiple);
