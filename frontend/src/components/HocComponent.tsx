import * as PropTypes from 'prop-types';
import * as React from 'react';
import { asyncComponent } from 'react-async-component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AuthActions, IDispatchProps } from '../actions/authActions';
import { getRoleRequestFetch } from '../api/hocAuthApi';
import { IAppState } from '../types';
import { LoadingComponent } from './LoadingComponent';

const HocComponet = (Component: any) => {
  return asyncComponent({
    resolve: async () => {
      const data = await getRoleRequestFetch();
      interface IStateProps {
        authState: boolean;
        role_type: string;
      }

      type TProps = IDispatchProps & IStateProps;
      class RetComp extends React.Component<TProps> {
        public static contextTypes = {
          router: PropTypes.object,
        };
        constructor(props: any, context: any) {
          super(props, context);
        }
        public componentWillMount() {
          this.props.authActions.onUpdateAuth(data.auth, data.role_type);
        }
        public onRedirect = (url: string) => {
          return document.location.replace(url);
        }
        public onRoute = () => {
          if (data.role_type === `/${document.location.pathname.split('/')[1]}`) {
            return <Component/>;
          }
          return this.context.router.history.push('/404');
        }
        public render() {
          return <div> {
            !data.auth ? this.onRedirect('/') : this.onRoute()
          } </div>;
        }
      }
      function mapStateToProps(state: IAppState): IStateProps {
        return {
          authState: state.commonReducer.authState,
          role_type: state.commonReducer.role_type,
        };
      }

      function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
        return {
          authActions: new AuthActions(dispatch),
        };
      }
      return connect(mapStateToProps, mapDispatchToProps)(RetComp);
    },
    LoadingComponent: () => <LoadingComponent/>,
  });
};
export default HocComponet;
