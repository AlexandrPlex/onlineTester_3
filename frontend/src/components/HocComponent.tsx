import * as PropTypes from 'prop-types';
import * as React from 'react';
import { asyncComponent } from 'react-async-component';
import {getRoleRequestFetch} from '../api/hocAuthApi';

const HocComponet = (Component: any) => {
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
          this.setState({auth: data.auth, role_type: data.role_type});
        }
        public onRedirect = (url: string) => {
          if (document.location.pathname !== '/') {
          return document.location.replace(url);
          }
          return <Component />;
        }
        public onRoute = () => {
          if (this.state.role_type === document.location.pathname) {
            return <Component/>;
          }
          if (document.location.pathname === '/') {
            return this.context.router.history.push(this.state.role_type);
          }
          return this.context.router.history.push('/404');
        }
        public render() {
          console.log(this.state.auth);
          return <div> {
            !this.state.auth ? this.onRedirect('/') : this.onRoute()
          } </div>;
        }
      };
    },
    LoadingComponent: () => <h1>Loading product</h1>,
  });
};
export default HocComponet;
