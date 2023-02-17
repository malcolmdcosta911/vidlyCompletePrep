import React, { Component } from 'react';
import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import auth from './services/authService';

import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import MovieForm from './components/movieForm';
import Logout from './components/logout';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/common/protectedRoute';


class App extends Component {

  state = {};

  componentDidMount() {

    const user = auth.getCurrentUser();
    this.setState({ user });

  }

  render() {
    const { user } = this.state;

    return (
      <Fragment>
        <ToastContainer />

        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/rentals' element={<Rentals />} />
            <Route path='/customers' element={<Customers />} />
            {/* <Route path='/movies/:id' element={<MovieForm />} /> */}
            <Route path="/movies">
              <Route index element={<Movies user={user} />} />
              <Route path=":id" element={
                <ProtectedRoute>
                  <MovieForm />
                </ProtectedRoute>
              } />

              {/* <Route path="new"
                element={
                  <ProtectedRoute>
                    <MovieForm />
                  </ProtectedRoute>
                } /> */}
            </Route>
            <Route path='/' element={<Navigate to='/movies' />} />
            <Route path='/' element={<Navigate to='/movies' />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </Fragment>
    );
  }
}

export default App;


