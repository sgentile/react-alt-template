import alt from 'libs/alt';
import MainActions from 'actions/MainActions';

class MainStore {
    constructor() {
        this.bindActions(MainActions);
        this.mainData = [];
    }

    getInitializedData(){
        this.setState({
            mainData: [
                {id:1, title:'Foo', content: 'Bruce Lee kicks his way into Kung-fu'},
                {id:2, title:'Bar', content: 'Nothing like sitting at the Bar'}
            ]
        });
    }
}

export default alt.createStore(MainStore, 'MainStore');