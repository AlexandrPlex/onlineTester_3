import * as PropTypes from 'prop-types';
import * as React from 'react';
import { asyncComponent } from 'react-async-component';
import { getRoleRequestFetch } from '../api/hocAuthApi';
import { LoadingComponent } from './LoadingComponent';

const HocLoginComponet = (Component: any) => {
  return asyncComponent({
    resolve: async () => {
      const data = await getRoleRequestFetch();
      return class extends React.Component<{}, {auth: boolean, role_type: string}> {
        public static contextTypes = {
          router: PropTypes.object,
        };
        constructor(props: any, context: any) {
          super(props, context);
          this.state = {
            auth: data.auth,
            role_type: data.role_type,
          };
        }
        public componentWillMount() {
          this.setState({auth: data.auth});
        }
        public onAuthTrue = () => {
          return this.context.router.history.push(this.state.role_type);
        }

        public render() {
          console.log(this.state.auth);
          return <div> {
           this.state.auth ? this.onAuthTrue() : <Component/>
          } </div>;
        }
      };
    },
    LoadingComponent: () => <LoadingComponent/>,
  });
};
export default HocLoginComponet;
