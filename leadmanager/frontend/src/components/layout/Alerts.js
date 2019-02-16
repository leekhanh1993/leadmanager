import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

class Alerts extends Component {
    static propTypes = {
        error: propTypes.object.isRequired
    }
    componentDidUpdate(prevProps) {
        const { error, alert } = this.props
        if (error !== prevProps.error) {
            if (error.msg.name) alert.error('Name is required')
            if (error.msg.email) alert.error('Email is required')
        }

    }
    render() {
        return <Fragment />
    }
}
const mapStateToProps = state => {
    return {
        error: state.errors
    }
}
export default connect(mapStateToProps)(withAlert()(Alerts));