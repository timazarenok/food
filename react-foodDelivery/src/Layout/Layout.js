import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillay';
import Header from './Header/Header';
import FoodLists from '../Components/FoodLists/FoodLists';

import {connect} from 'react-redux';
import {filterItems} from  '../store/actions/actions';

class layout extends Component{
    constructor(props){
        super(props);
        this.state ={
            cartSum: 0,
            items: {},
            cartCount: 0
        }
    }

    setCartTotal = (count, sum, items) => {
        this.setState({
            cartCount: count,
            cartSum: sum,
            items: items
        });
    }
     
    render()
    {
        return (
            <Auxillary>
            <Header 
                cartCount={this.state.cartCount} 
                filterFood={this.props.filterItem}
                cartSum={this.state.cartSum} 
                items={this.state.items}
            />
            <br/>
            <h1>Популярная еда </h1>
            <FoodLists 
                setCartTotal={this.setCartTotal}
                filteredValue={this.props.filteredFood}  />
            </Auxillary>
        )
    }
}

const mapStatetoProps = state => {
    return{
        filteredFood: state.layout.filteredFood
    };
}
const mapDispatchToProps = dispatch => {
    return{
        filterItem: (event) => dispatch(filterItems(event.target.value)),
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(layout);