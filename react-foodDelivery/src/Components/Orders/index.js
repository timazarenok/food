import React from 'react';

import axios from 'axios';
import './Orders.css'
import { Link } from 'react-router-dom';


class Orders extends React.Component{
    constructor() {
        super();
        this.state = {
          data: []
        };
      }
    
    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      axios.get("http://localhost:5000/orders")
      .then(response => {
        this.setState({
          data: response.data
        })
      })
      .catch(err => console.log(err))
    }
    
    render()
    {
      const {data} = this.state;
      return(
          <div>
              <ul className="orders">
                {
                  data.map(el => (
                    <li>
                      <div className="card">
                        <div class="card-body">
                          <h5 class="card-title">{el.name}</h5>
                          <p class="card-text">{el.address}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">{el.pincode}</li>
                          <li class="list-group-item">{el.phone_number}</li>
                        </ul>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <br/>
              <Link to="/" className="btn btn-danger">
                Назад
              </Link>
          </div>
      )
    }
}

export default Orders;