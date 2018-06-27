import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface IHeaderProps {
  menuItemList?: [object];
}

export class Header extends React.PureComponent<IHeaderProps> {
  public render() {
    return <nav>
      <div className='nav-wrapper'>
        <div className='container'>
          <span className='brand-logo'><NavLink exact={true} activeClassName='active-link' to='/'>Tester Online</NavLink></span>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li key='react'><NavLink activeClassName='active-link' to='/react'>React</NavLink></li>
            <li key='materialize'>
              <a className='dropdown-button' href='#' data-target='header-dropdown'>Dropdown</a>
            </li>
            <li key='404'><NavLink activeClassName='active-link' to='/404'>NotFound</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>;
  }
}
