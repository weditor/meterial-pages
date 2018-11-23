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

// function getSuggestions(value) {
//   const inputValue = deburr(value.trim()).toLowerCase();
//   const inputLength = inputValue.length;
//   let count = 0;

//   return inputLength === 0
//     ? []
//     : suggestions.filter(suggestion => {
//         const keep =
//           count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

//         if (keep) {
//           count += 1;
//         }

//         return keep;
//       });
// }

class DownshiftMultiple extends React.Component {
    tag_input = "";
    searchTag = debounce(this.loadTag, 500);
    state = {
        inputValue: "",
        selectedItem: [],
        tags: []
    };

    renderSuggestion({
        suggestion,
        index,
        itemProps,
        highlightedIndex,
        selectedItem
    }) {
        const isHighlighted = highlightedIndex === index;
        const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.label}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400
                }}
                // onClick={()=>this.addTag()}
            >
                {suggestion.type == 2 && "新建: "}{suggestion.label}
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

    handleChange1 = item => {
        console.log("select")
        console.log(item)
        let { selectedItem } = this.state;

        if (selectedItem.indexOf(item) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.setState({
            inputValue: "",
            selectedItem
        });
    };

    handleDelete = item => () => {
        this.setState(state => {
            const selectedItem = [...state.selectedItem];
            selectedItem.splice(selectedItem.indexOf(item), 1);
            return { selectedItem };
        });
    };

    // handleChange = name => value => {
    //     console.log(name);
    //     console.log(value);
    //     this.setState({
    //         [name]: value
    //     });
    // };

    handleChange(item) {
        // console.log(tags);
        if (item.type == 2) {
            console.log("Create Tags")
            console.log(item)
            this.props.api.addTag(item.value, false).then(tag => {
                this.handleChange1({value: tag.name, label: tag.name, pinyin: tag.pinyin, type: 1})
                // this.handleChange1(js)
            });
        } else {
            this.handleChange1(item)
            // this.setState({ selected: tags });
        }
    }

    suggestions() {
        let suggestions2 = this.state.tags.map(tag=>({value: tag.name, label: tag.name, pinyin: tag.pinyin, type: 1}));
        // console.log(suggestions2);
        suggestions2.push({
            value: this.state.inputValue,
            label: this.state.inputValue,
            pinyin: "",
            type: 2
        });
        // console.log(suggestions2);
        return suggestions2;
    }

    filterOption(option, rawInput) {
        return true;
    }

    loadTag() {
        // console.log(this.tag_input)
        this.props.api
            .listTag(this.state.inputValue, 0, 0)
            .then(js => this.setState({ tags: js.results }));
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
                                        key={item.label}
                                        tabIndex={-1}
                                        label={item.label}
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
