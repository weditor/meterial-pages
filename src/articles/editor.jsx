import React from 'react'
import CodeMirror from 'codemirror'

import './codemirror.css'
import 'codemirror/addon/mode/loadmode'


CodeMirror.modeURL = 'codemirror/mode/%N/%N.js'

class MirrorEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        if (this.props != props) {
            if (this.editor) {
                this.editor.getDoc().setValue(props.value);
            }
        }
    }
    
    change(cm, changeObj) {
        if (!this.props.onChange) {
            return;
        }
        this.props.onChange(cm.getDoc().getValue());
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.dom, {
            value: this.props.value,
        });
        CodeMirror.on(this.editor, "change", (cm, changeObj) => this.change(cm, changeObj));
    }

    onBuild(ref) {
        this.dom = ref;
    }

    render() {
        return <textarea ref={ref=>this.onBuild(ref)} />
    }
}


export default MirrorEditor;
