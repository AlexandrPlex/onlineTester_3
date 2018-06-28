import {getRoleRequest} from '../api/hocAuthApi';

const asyncComponent = (Component: any) => {
    getRoleRequest();
    return Component;
}

export default  asyncComponent;
