import React from 'react'
import CodeMirror from 'codemirror'

import './codemirror.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/mode/loadmode'
// import '../../node_modules/codemirror/mode/meta.js'
// require('codemirror/lib/codemirror.css')
// require('codemirror/addon/mode/loadmode.js')
require('codemirror/mode/javascript/javascript.js')


CodeMirror.modeURL = 'codemirror/mode/%N/%N.js'

class MirrorEditor extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.dom, {
            mode: "javascript"
        });
        this.editor.setOption('mode', "text/javascript");
        CodeMirror.autoLoadMode(this.editor, "javascript")
        // this.editor = CodeMirror(this.dom, {
        //     value: "function myScript(){return 100;}\n",
        //     mode:  "javascript"
        //   });
    }

    onBuild(ref) {
        console.log(ref);
        this.dom = ref;
    }

    render() {
        return <textarea ref={ref=>this.onBuild(ref)} />
    }
}


export default MirrorEditor;
