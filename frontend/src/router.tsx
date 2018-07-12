import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { StudentForm } from './components/StudentForm';
import { TesterForm } from './components/TesterForm';

import { AdminPage } from './pages/AdminPage';
import { StudentPage } from './pages/StudentPage';
import { TeacherPage } from './pages/TeacherPage';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { LoginRoute } from './components/LoginRoute';
import { PrivateRoute } from './components/PrivateRoute';

const withAppLayout = (Component: any) => (props: any) => <StudentPage><Component {...props} /></StudentPage>;

export const router = (
  <div>
    <Header />
    <Switch>
      <LoginRoute exact path='/' component={ LoginPage } />
      <PrivateRoute path='/student/test/:id' component={ withAppLayout(TesterForm) }/>
      <PrivateRoute path='/student' component={ withAppLayout(StudentForm) }/>
      <PrivateRoute path='/admin' component={ AdminPage} />
      <PrivateRoute path='/teacher' component={ TeacherPage } />
      <Route path='*' component={NotFoundPage}/>
    </Switch>
    <Footer />
  </div>
);
