import AltContainer from 'alt-container';
import {Component} from 'react';

import MainStore from 'stores/MainStore';
import ShowWhen from 'components/ShowWhen';

import MainDetails from 'components/main/MainDetails';

export default class Main extends Component {
    render() {
        return (
            <AltContainer store={MainStore}>
                <ShowWhen prop="mainData">
                    <MainDetails  />
                </ShowWhen>
            </AltContainer>
        );
    }
}

