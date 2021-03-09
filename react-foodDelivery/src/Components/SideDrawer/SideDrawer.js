import React from 'react';
import './SideDrawer.css';

import { connect } from "react-redux";
import { loginUser } from "../../store/actions/actions";
import classnames from "classnames"
import axios from 'axios';
import PropTypes from "prop-types";

class SideDrawer extends React.Component{
    constructor() {
        super();
        this.state = {
          userName: "",
          password: "",
          errors: {},
        };
      }
    
      componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/orders");
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors,
          });
        }
      }
    
      onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
      };
    
      onSubmit = (e) => {
        e.preventDefault();
        const userData = {
          userName: this.state.userName,
          password: this.state.password,
        };
        axios.post("http://localhost:5000/users/login", userData)
        .then(() => this.props.history.push("/"))
        .catch(err => console.log(err))
        this.props.loginUser(userData) // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      };

    render()
    {
        const { errors } = this.state;

        let loginForm = (
            <form onSubmit={this.onSubmit}>
                <input
                  onChange={this.onChange}
                  value={this.state.userName}
                  error={errors.userName}
                  id="userName"
                  type="text"
                  placeholder="Имя"
                  className={classnames("", {
                    invalid: errors.userName || errors.userName,
                  })}
                />
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <span className="text-danger font-weight-bold">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                <br/>
                <br/>
                <div className="input-w3ls">
                  <input type="submit" value="Отправить" className="submit-button" />
                </div>
            </form>
        );
        return(
            <div className="parentDiv">
                <h2>Логин</h2>
                <div className="loginBlock">
                {
                  loginForm
                }
                </div>  
            </div>
        )
    }
}

SideDrawer.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(SideDrawer);

  
