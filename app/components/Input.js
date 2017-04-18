import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import omit from 'omit'

export default class Input extends Component {
    static propTypes = {
        onChange: PropTypes.func
    }

    static defaultProps = {
        onChange: () => {}
    }
    
    constructor (props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange (e) {
        this.props.onChange(e)
    }

    render () {
        const props = this.props
        return (
            <input onChange={this.onChange} {...omit(['onChange'], this.props)}  type="text"/>
        )
    }
}