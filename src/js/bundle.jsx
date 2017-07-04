import React, { Component } from 'react'

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: null
        };
        this.load.bind(this);
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        })

        props.load().then(function(mod){
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        }.bind(this));
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null
    }
}

export default Bundle