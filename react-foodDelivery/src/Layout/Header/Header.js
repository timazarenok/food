import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Modal from '../../Components/Modal/Modal';
import HelpBot from '../../Components/HelpBot/HelpBot';
import { connect } from 'react-redux';
import './Header.css';
import * as actionCreators from '../../store/actions/actions';
import AddressForm from '../../Components/AddressForm/AddressForm';

class Header extends Component {
  
    render()
    {
        const { anchorEl } = this.props;
        const { user } = this.props.auth;

        return (
            <div>
                <AppBar position="static" className="headerMain">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className="typo"/>
                        <div>
                            <Typography variant="title" gutterBottom className="signin">
                                <a href="/orders" style={{
                                    display: user.id === undefined ? "none" : "auto",
                                    color: "white"
                                }}>
                                    <FontAwesomeIcon icon="user"/>
                                </a>
                            </Typography>
                        </div>
                        <div  onClick={this.props.invokeBot}>
                           <Typography variant="title" gutterBottom className="signin">
                                <FontAwesomeIcon icon="robot" />
                           </Typography>
                        </div>
                        <span 
                           onMouseOver={() => this.props.onHover(true)} 
                           onMouseLeave={() => this.props.onHover(false)}
                           className={(this.props.isHovered ?"searchBoxExtended": "searchBox")}
                        >
                            <FontAwesomeIcon 
                                icon="search"  
                                className={(this.props.isHovered?"searchIconExtended": "searchIcon")}/>
                            <input 
                                type="text" 
                                placeholder="search.."  
                                onChange={(event)=>{this.props.filterFood(event)}}
                                className="inputPlaceholder"/>
                        </span>
                        <Button 
                            color="inherit" 
                            onClick={this.props.handleClick}
                        >
                            <FontAwesomeIcon icon="shopping-cart"/>
                            <span 
                                className="cartCount">
                                {this.props.cartCount}
                            </span>
                        </Button>
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.props.handleClose}
                            TransitionComponent={Fade}
                            className="menu">
                            {
                                this.props.cartCount > 0 ?
                                <div>
                                    <MenuItem 
                                        onClick={this.props.handleClose} 
                                        className="menusItem"
                                    >
                                        Количество : {this.props.cartCount}
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={this.props.handleClose} 
                                        className="menusItem">
                                        Итог : {this.props.cartSum}
                                    </MenuItem>
                                    <br/>
                                    <MenuItem 
                                        onClick={this.props.checkOut}> 
                                        <Button 
                                        color="primary"
                                        className="btn">
                                            Заказ
                                        </Button>
                                    </MenuItem>
                                </div> :
                                <MenuItem 
                                    onClick={this.props.handleClose} 
                                    onMouseLeave={this.props.handleClose} 
                                    className="menuItem">
                                <img 
                                    src="https://cdn.dribbble.com/users/844846/screenshots/2981974/empty_cart_800x600_dribbble.png"
                                    width="250px" 
                                    height="250px" 
                                    alt="desc"/>    
                                </MenuItem>
                            }
                        </Menu>
                    </Toolbar>
                </AppBar>
                {
                    this.props.isCheckedOut ? 
                        <Modal 
                            totalItems={this.props.cartCount} 
                            modalClose={this.props.closeModal}
                            items={this.props.items}
                            totalPrice={this.props.cartSum}
                            orderForm={this.props.orderForm}
                        /> : ''
                }
                {
                    this.props.isBotEnabled ?
                    <HelpBot closeModal={this.props.disableBot}/> : ''
                }
                {
                  this.props.isOrdered ? <AddressForm modalClose={this.props.closeAddressModal}/> : null 
                }
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return{
        isHovered: state.layout.isHovered,
        anchorEl: state.layout.anchorEl,
        isCheckedOut: state.layout.isCheckedOut,
        isBotEnabled: state.layout.isBotEnabled,
        isOrdered: state.layout.isOrdered,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onHover: (state) => dispatch(actionCreators.onHover(state)),
        handleClick: (event) => dispatch(actionCreators.handleClick(event.currentTarget)),
        checkOut: () => dispatch(actionCreators.checkOut(true)),
        handleClose: () => dispatch(actionCreators.handleClick(null)),
        closeModal: () => dispatch(actionCreators.checkOut(false)),
        invokeBot: () => dispatch(actionCreators.invokeBot(true)),
        disableBot: () => dispatch(actionCreators.invokeBot(false)),
        orderForm: () => dispatch(actionCreators.orderForm(true)),
        closeAddressModal:()=> dispatch(actionCreators.closeAddressModal(false))
     }
    }

export default connect(mapStatetoProps, mapDispatchToProps)(Header);



