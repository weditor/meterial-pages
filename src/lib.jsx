import React from 'react'


let withProps = add_props => component => props => (
    React.createElement(component, Object.assign({}, props, add_props))
)


export { withProps };
