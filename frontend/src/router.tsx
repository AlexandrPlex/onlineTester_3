import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { AdminPage } from './pages/AdminPage';
import { StudentPage } from './pages/StudentPage';
import { TeacherPage } from './pages/TeacherPage';

import RouterComponentHOC from './components/HocComponent';
import HocLoginComponet from './components/HocLoginComponent';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const router = (
  <div>
    <Header />
    <Switch>
      <Route exact path='/' component={ HocLoginComponet(LoginPage) } />
      <Route path='/student' component={ RouterComponentHOC(StudentPage) } />
      <Route path='/admin' component={ RouterComponentHOC(AdminPage)} />
      <Route path='/teacher' component={ RouterComponentHOC(TeacherPage)} />
      <Route path='*' component={NotFoundPage}/>
    </Switch>
    <Footer />
  </div>
);
