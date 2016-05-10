import alt from 'libs/alt';

class MainActions {
    constructor(){
        this.generateActions(
            'getInitializedData'
        );
    }
}

export default alt.createActions(MainActions);