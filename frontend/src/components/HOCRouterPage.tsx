import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {IDispatchProps, LoginActions} from '../actions/loginActions';

const HOCRouterPage = (Component: any) => {

    class Ho extends React.Component<IDispatchProps, {role: any}> {
        public componentWillMount() {
            this.props.loginActions.onGetRole().then((res: any) => {
                this.setState({role: res.role});
            });
       }
        public render() {
            return (
                <div>
                <Component />
                    {this.state.role}
                </div>
            );
        }
    }

    function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
        return {
            loginActions: new LoginActions(dispatch),
        };
    }

    return connect(mapDispatchToProps)(Ho);
};

export default HOCRouterPage;
