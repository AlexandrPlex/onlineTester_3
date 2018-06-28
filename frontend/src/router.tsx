import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { AdminPage } from './pages/AdminPage';
import { StudentPage } from './pages/StudentPage';
import { TeacherPage } from './pages/TeacherPage';

import asyncComponent from './components/HocComponent';

console.log(asyncComponent(StudentPage));

import { Footer } from './components/Footer';

export const router = (
  <div>
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/student' component={StudentPage} />
      <Route path='/admin' component={AdminPage} />
      <Route path='/teacher' component={TeacherPage} />
      <Route path='*' component={NotFoundPage}/>
    </Switch>
    <Footer />
  </div>
);
