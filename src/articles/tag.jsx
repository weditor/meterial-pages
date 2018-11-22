import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { debounce } from "lodash";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";

// const suggestions = [
//     { label: "Afghanistan" },
//     { label: "Aland Islands" },
//     { label: "Albania" },
//     { label: "Algeria" },
//     { label: "American Samoa" },
//     { label: "Andorra" },
//     { label: "Angola" },
//     { label: "Anguilla" },
//     { label: "Antarctica" },
//     { label: "Antigua and Barbuda" },
//     { label: "Argentina" },
//     { label: "Armenia" },
//     { label: "Aruba" },
//     { label: "Australia" },
//     { label: "Austria" },
//     { label: "Azerbaijan" },
//     { label: "Bahamas" },
//     { label: "Bahrain" },
//     { label: "Bangladesh" },
//     { label: "Barbados" },
//     { label: "Belarus" },
//     { label: "Belgium" },
//     { label: "Belize" },
//     { label: "Benin" },
//     { label: "Bermuda" },
//     { label: "Bhutan" },
//     { label: "Bolivia, Plurinational State of" },
//     { label: "Bonaire, Sint Eustatius and Saba" },
//     { label: "Bosnia and Herzegovina" },
//     { label: "Botswana" },
//     { label: "Bouvet Island" },
//     { label: "Brazil" },
//     { label: "British Indian Ocean Territory" },
//     { label: "Brunei Darussalam" }
// ].map(suggestion => ({
//     value: suggestion.label,
//     label: suggestion.label,
//     type: 1
// }));

// const styles = theme => ({
//     root: {
//         flexGrow: 1
//         // height: 250
//     },
//     input: {
//         display: "flex",
//         padding: 0
//     },
//     valueContainer: {
//         display: "flex",
//         flexWrap: "wrap",
//         flex: 1,
//         alignItems: "center",
//         overflow: "hidden"
//     },
//     chip: {
//         margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
//     },
//     chipFocused: {
//         backgroundColor: emphasize(
//             theme.palette.type === "light"
//                 ? theme.palette.grey[300]
//                 : theme.palette.grey[700],
//             0.08
//         )
//     },
//     noOptionsMessage: {
//         padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
//     },
//     singleValue: {
//         fontSize: 16
//     },
//     placeholder: {
//         position: "absolute",
//         left: 2,
//         fontSize: 16
//     },
//     paper: {
//         position: "absolute",
//         zIndex: 1,
//         marginTop: theme.spacing.unit,
//         left: 0,
//         right: 0
//     },
//     divider: {
//         height: theme.spacing.unit * 2
//     }
// });

// function NoOptionsMessage(props) {
//     return (
//         <Typography
//             color="textSecondary"
//             className={props.selectProps.classes.noOptionsMessage}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }

// function inputComponent({ inputRef, ...props }) {
//     return <div ref={inputRef} {...props} />;
// }

// function Control(props) {
//     return (
//         <TextField
//             fullWidth
//             InputProps={{
//                 inputComponent,
//                 inputProps: {
//                     className: props.selectProps.classes.input,
//                     inputRef: props.innerRef,
//                     children: props.children,
//                     ...props.innerProps
//                 }
//             }}
//             {...props.selectProps.textFieldProps}
//         />
//     );
// }

// function Option(props) {
//     // console.log(props.data)
//     if (props.data.type == 2) {
//         return (
//             <MenuItem
//                 buttonRef={props.innerRef}
//                 selected={props.isFocused}
//                 component="div"
//                 style={{
//                     fontWeight: props.isSelected ? 500 : 400,
//                     backgroundColor: "#aaa"
//                 }}
//                 {...props.innerProps}
//             >
//                 <ListItemIcon>
//                     <AddIcon />
//                 </ListItemIcon>
//                 <ListItemText inset primary={props.children} />
//             </MenuItem>
//         );
//     }
//     return (
//         <MenuItem
//             buttonRef={props.innerRef}
//             selected={props.isFocused}
//             component="div"
//             style={{
//                 fontWeight: props.isSelected ? 500 : 400
//             }}
//             {...props.innerProps}
//         >
//             {props.children}
//         </MenuItem>
//     );
// }

// function Placeholder(props) {
//     return (
//         <Typography
//             color="textSecondary"
//             className={props.selectProps.classes.placeholder}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }

// function SingleValue(props) {
//     return (
//         <Typography
//             className={props.selectProps.classes.singleValue}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }

// function ValueContainer(props) {
//     return (
//         <div className={props.selectProps.classes.valueContainer}>
//             {props.children}
//         </div>
//     );
// }

// function MultiValue(props) {
//     return (
//         <Chip
//             tabIndex={-1}
//             label={props.children}
//             className={classNames(props.selectProps.classes.chip, {
//                 [props.selectProps.classes.chipFocused]: props.isFocused
//             })}
//             onDelete={props.removeProps.onClick}
//             deleteIcon={<CancelIcon {...props.removeProps} />}
//         />
//     );
// }

// function Menu(props) {
//     return (
//         <Paper
//             square
//             className={props.selectProps.classes.paper}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Paper>
//     );
// }

// const components = {
//     Control,
//     Menu,
//     MultiValue,
//     NoOptionsMessage,
//     Option,
//     Placeholder,
//     SingleValue,
//     ValueContainer
// };

const suggestions = [
    { label: "Afghanistan" },
    { label: "Aland Islands" },
    { label: "Albania" },
    { label: "Algeria" },
    { label: "American Samoa" },
    { label: "Andorra" },
    { label: "Angola" },
    { label: "Anguilla" },
    { label: "Antarctica" },
    { label: "Antigua and Barbuda" },
    { label: "Argentina" },
    { label: "Armenia" },
    { label: "Aruba" },
    { label: "Australia" },
    { label: "Austria" },
    { label: "Azerbaijan" },
    { label: "Bahamas" },
    { label: "Bahrain" },
    { label: "Bangladesh" },
    { label: "Barbados" },
    { label: "Belarus" },
    { label: "Belgium" },
    { label: "Belize" },
    { label: "Benin" },
    { label: "Bermuda" },
    { label: "Bhutan" },
    { label: "Bolivia, Plurinational State of" },
    { label: "Bonaire, Sint Eustatius and Saba" },
    { label: "Bosnia and Herzegovina" },
    { label: "Botswana" },
    { label: "Bouvet Island" },
    { label: "Brazil" },
    { label: "British Indian Ocean Territory" },
    { label: "Brunei Darussalam" }
];

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

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

function renderSuggestion({
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
        >
            {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
              const keep =
                  count < 5 &&
                  suggestion.label.slice(0, inputLength).toLowerCase() ===
                      inputValue;

              if (keep) {
                  count += 1;
              }

              return keep;
          });
}

class DownshiftMultiple extends React.Component {
    state = {
        inputValue: "",
        selectedItem: []
    };

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
    };

    handleChange = item => {
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

    render() {
        const { classes } = this.props;
        const { inputValue, selectedItem } = this.state;

        return (
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={this.handleChange}
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
                                        key={item}
                                        tabIndex={-1}
                                        label={item}
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
                                {getSuggestions(inputValue2).map(
                                    (suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({
                                                item: suggestion.label
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

let popperNode;

class TagSelector extends React.Component {
    state = {
        single: null,
        selected: null,
        tags: []
    };

    tag_input = "";
    searchTag = debounce(this.loadTag, 500);

    handleChange = name => value => {
        console.log(value);
        this.setState({
            [name]: value
        });
    };

    updateTags(tags) {
        if (tags.length && tags[tags.length - 1].type == 2) {
            let new_tag = tags[tags.length - 1];
            this.props.api.addTag(new_tag.value, false).then(js => {
                let tags2 = tags.slice(0, tags.length - 1);
                tags2.push(js);
                this.setState({ selected: tags2 });
            });
        } else {
            this.setState({ selected: tags });
        }
    }

    suggestions() {
        let suggestions2 = this.state.tags;
        suggestions2.push({
            value: "add",
            label: "增加",
            type: 2
        });
        console.log(suggestions2);
        return suggestions2;
    }

    filterOption(option, rawInput) {
        return true;
    }

    loadTag() {
        // console.log(this.tag_input)
        this.props.api
            .listTag(this.tag_input, 0, 0)
            .then(js => this.setState({ tags: js.results }));
    }

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                "& input": {
                    font: "inherit"
                }
            })
        };

        return (
            <DownshiftMultiple classes={classes} />
            // <div className={classes.root}>
            // <Select
            //     classes={classes}
            //     styles={selectStyles}
            //     onInputChange={v => {
            //         this.tag_input = v;
            //         this.searchTag();
            //     }}
            //     textFieldProps={{
            //         label: "Label",
            //         InputLabelProps: {
            //             shrink: true
            //         }
            //     }}
            //     options={this.suggestions()}
            //     components={components}
            //     value={this.state.multi}
            //     onChange={tags => this.updateTags(tags)}
            //     // onChange={(...props) => console.log(props)}
            //     placeholder="Select multiple countries"
            //     filterOption={(...props) => this.filterOption(...props)}
            //     isMulti
            // />
            // </div>
        );
    }
}

TagSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TagSelector);
