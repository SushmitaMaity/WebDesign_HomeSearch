import React  from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import store from '../../Store/store';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllUsers } from "../../Store/actions/adminActions";
import { getMessages } from "../../Store/actions/messageActions";
import { getContacts } from "../../Store/actions/contactActions";
import './Users.scss';


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    // Fetching redux actions on compoenent mount
    componentDidMount() {
        this.props.getAllUsers();
    }

    render() {
        return (
// Using ag-grid to display table by accessing redux state
            <>
                {this.props.admin ?
                    <div className="ag-theme-alpine" style={{ height: 900, width: '60%', marginLeft: 300 }}>
                        <AgGridReact
                            rowData={this.props.admin.allUsers}>
                            <AgGridColumn field="Users of HomesByASAP" width={850}>
                                <AgGridColumn field="name" width={500}></AgGridColumn>
                                <AgGridColumn field="email" width={350}></AgGridColumn>
                            </AgGridColumn>
                        </AgGridReact>
                    </div> : null
                }
            </>

        );
    }
};


// Connecting with redux store to access actions and reducer states
Users.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    //loginUser: PropTypes.func.isRequired,
    getContacts: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    admin: state.admin,
    messages: state.messages,
    contacts: state.contacts
});

export default connect(
    mapStateToProps,
    { getAllUsers, getMessages, getContacts }
)((Users));