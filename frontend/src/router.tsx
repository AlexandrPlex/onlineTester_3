import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { AdminPage } from './pages/AdminPage';
import { StudentPage } from './pages/StudentPage';
import { TeacherPage } from './pages/TeacherPage';

import HOCRouterPage from './components/HOCRouterPage';

import { Footer } from './components/Footer';

export const router = (
  <div>
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/student' component={HOCRouterPage(StudentPage)} />
      <Route path='/admin' component={AdminPage} />
      <Route path='/teacher' component={TeacherPage} />
      <Route path='*' component={NotFoundPage}/>
    </Switch>
    <Footer />
  </div>
);
