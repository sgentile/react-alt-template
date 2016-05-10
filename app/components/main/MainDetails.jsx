import {Component, PropTypes} from 'react';
import {Table, PageHeader} from 'react-bootstrap';

export default class MainDetails extends Component {
    render(){
        console.log(this.props);
        return (
            <div>
                <PageHeader>Example details view <small>Uses React-Bootstrap</small></PageHeader>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.mainData.map(data =>
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.content}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}