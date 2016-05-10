import {Component, Children, cloneElement} from 'react';
import _ from 'lodash';

export default class ShowWhen extends Component {
    //Syntax:
    // <ShowWhen prop="propName" value="equalsThisValue"></ShowWhen>
    // <ShowWhen prop="propNameIsTruthy"></ShowWhen>

    render() {
        var {value, prop, children, loader, ...other} = this.props;
        var childrenWithProps = Children.map(children,c => cloneElement(c, other));

        let propertyValue = _.get(this.props, prop);
        if ((value !== undefined && propertyValue === value) ||
            (value === undefined && propertyValue)) {
            return childrenWithProps.length !== undefined  ? <div>{childrenWithProps}</div> : childrenWithProps;
        }else if (loader !== false) {
            return (<div className="loader">Loading...</div>);
        }else{
            return null;
        }
    }
}
