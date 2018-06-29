import * as React from 'react';
import { asyncComponent } from 'react-async-component';
import {Redirect} from 'react-router';
import {getRoleRequestFetch} from '../api/hocAuthApi';

const HocComponet = (Component: any) => {
  return asyncComponent({
    resolve: async () => {
      const data = await getRoleRequestFetch();
      console.log(data);
      return class extends React.Component {
        public render() {
          console.log(data.auth);
          return <div> {data.auth ? < Component /> : <Redirect to={'/'}/>} </div>;
        }
      };
    },
  });
};
export default HocComponet;
