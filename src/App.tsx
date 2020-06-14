import React from 'react';
import Home from './Home';
import Result from './Results';
import Login from './SignIn';
import Signup from './SignUp';
import All from './All';
import UserSearch from './UserSearch';
import MapLocal from './MapLocal';
import {AuthProvider} from './Auth';
import {Provider} from 'react-redux';
import store  from './store';
import AuthRoute from './ProtectedRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
require('dotenv').config();



//Initialize appolo client with to access for graphl data
const client = new ApolloClient({
  uri: 'https://serene-anchorage-25424.herokuapp.com/graphql'
})


//Main (Root) Component to house all other component
//Also a protected route for Home page.

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <div className="App">
      <ApolloProvider client={client}>
      <AuthProvider>
      <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <AuthRoute path="/home" component={Home} />
            <AuthRoute exact path="/search" component={Result}/>
            <AuthRoute exact path="/results" component={All}/>
            <AuthRoute exact path="/user-result" component={UserSearch}/>
            <AuthRoute exact path="/maps" component={MapLocal}/>
        </Switch>
      </Router>
      </AuthProvider>
      </ApolloProvider>
    </div>
    </Provider>
  );
}

export default App;
