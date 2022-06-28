import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      //if user sign in we will check if they are actually signining in 
      //if there is we will get bak the user ref from our create user profile document method from the 
      //userAuth object being passed in  
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
//if there was a document there we wil simply just get the userRef
//if there was no document we will cretae a new object and document in that place 
//and we will still back the userRef then we are gonna listento this userRef for any changes to that data
//But we'll also get back the first stateof that data so then using that we are going to set
//the state of our local app.js with the id and snapshots data

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
//and then if the user ever logs out we willmake sure to set 
//the current user to null 
      setCurrentUser(userAuth);//
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();//tthis will close the subscription
  }//this will aware the firebase from any auth changes

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);