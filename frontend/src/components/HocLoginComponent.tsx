import * as PropTypes from 'prop-types';
import * as React from 'react';
import { asyncComponent } from 'react-async-component';
import {getRoleRequestFetch} from '../api/hocAuthApi';

const HocLoginComponet = (Component: any) => {
  return asyncComponent({
    resolve: async () => {
      const data = await getRoleRequestFetch();
      return class extends React.Component<{}, {auth: boolean}> {
        public static contextTypes = {
          router: PropTypes.object,
        };
        constructor(props: any, context: any) {
          super(props, context);
          this.state = {
            auth: data.auth,
          };
        }
        public componentWillMount() {
          this.setState({auth: data.auth});
        }
        public onAuthTrue = () => {};
        public onAuthFalse = () => {};
        public render() {
          console.log(this.state.auth);
          return <div> {
            this.state.auth ? this.onAuthTrue : this.onAuthFalse
          } </div>;
        }
      };
    },
    LoadingComponent: () => <h1>Loading product</h1>,
  });
};
export default HocLoginComponet;
