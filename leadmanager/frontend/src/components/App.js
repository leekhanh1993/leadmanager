import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import Header from './layout/Header';
import Dashboard from './lead/Dashboard';
import { Provider } from 'react-redux'
import store from "../store"
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './layout/Alerts'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Register from './accounts/Register';
import Login from './accounts/Login';
import { loadUser } from "../actions/auth"
import PrivateRoutes from './commons/PrivateRoutes';

//Alert Option
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <PrivateRoutes exact path="/" component={Dashboard} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))