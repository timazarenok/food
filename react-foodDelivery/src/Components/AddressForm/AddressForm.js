import React,{Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Auxillay from '../../hoc/Auxillay';
import  './AddressForm.css';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'

const styles ={
    close:{
        float: 'left',
        right: '0px',
        cursor:'pointer',
        marginBottom:'10%'
    },
    btnColor:{
        color:'brown'
    }
    ,btnDisable:{
        color: '#9c7676',
        cursor: 'none',
        background: '#dedede'
    },
    invalidInput:{
        border:'1px solid red',
        outline:'none'
    },
    validInput:{
        border:'1px solid black'
    }
}

class AddressForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            isInvalidAddressForm:true,
            addressForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Имя'
                    },
                    value:'',
                    isInValid:true,
                    validation:{
                        isRequired:true
                    },
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Адрес'
                    },
                    value:'',
                    isInValid:true,
                    validation:{
                        isRequired:true
                    },
                    touched:false
                },
                pincode:{
                    elementType:'input',
                    elementConfig:{
                        type:'number',
                        placeholder:'Индекс'
                    },
                    value:'',
                    isInValid:true,
                    validation:{
                        isRequired:true
                    },
                    touched:false
                },
                phone:{
                    elementType:'input',
                    elementConfig:{
                        type:'number',
                        placeholder:'Номер телефона'
                    },
                    value:'',
                    isInValid:true,
                    validation:{
                        isRequired:true
                    },
                    touched:false
                }
            }
        }
    }

    checkValidity(value,rules){
        if(rules.isRequired){
            if(value.trim().length!==0){
                return false;
            }
            else{
                return true;
            }
        }
    }

    changeForm=(event,id)=> {
        const updatedAddressForm = {
            ...this.state.addressForm
        };
        const upadatedElement = {
            ...updatedAddressForm[id]
        }
        let validationArray = '';
        let isInvalidAddressForm = true;
        upadatedElement.value = event.target.value;
        upadatedElement.isInValid = this.checkValidity(upadatedElement.value,upadatedElement.validation);
        upadatedElement.touched =true;
        updatedAddressForm[id] = upadatedElement;
        for(let identifier in updatedAddressForm){
            validationArray = validationArray.concat(updatedAddressForm[identifier].isInValid.toString());
        }
        if(validationArray.indexOf("true")>=0)
        {
            isInvalidAddressForm= true;
        }
        else{
            isInvalidAddressForm= false;
        }

        this.setState({
            isInvalidAddressForm: isInvalidAddressForm,
            addressForm: updatedAddressForm
        });
    }
        
    submitAddress =() => {
        const orderForm = {};
        for(let id in this.state.addressForm){
            orderForm[id] = this.state.addressForm[id].value;
        }
        const obj = {
            ...orderForm,
            items: this.props.items
        }
        axios.post('http://localhost:5000/orders/create', obj)
        .then(() => console.log("here"))
        .catch((err) => {
            console.log("Ошибка в Заказе!" + err);
        });
    }
    
    render(){
        var addressArray =[];
        for(let key in this.state.addressForm){
            addressArray.push({
                id:key,
                isInvalidAddressForm:this.state.isInvalidAddressForm,
                config:this.state.addressForm[key]
            });
        }

        let addressForm =(
            <form onSubmit={this.submitAddress}>
                { addressArray.map((addressForm,key)=>{
                    return <div>
                            <input 
                            type="text" 
                            style={(
                                (addressForm.config.touched && 
                                addressForm.config.isInValid) ? styles.invalidInput
                                : styles.validInput
                            )}
                            key={addressForm.id}
                            placeholder={addressForm.config.elementConfig.placeholder}
                            onChange={(event)=>this.changeForm(event,addressForm.id)}/></div>
                     
                })}<br/><br/>
                  <Button variant="outlined" 
                    color="primary" 
                    onClick={this.submitAddress}
                    style={(this.state.isInvalidAddressForm? styles.btnDisable:
                      styles.btnColor)}
                    disabled={this.state.isInvalidAddressForm}>Отправить</Button>
            </form>
        );
        return(
            <Auxillay>
            <Backdrop clicked={this.props.modalClose}/>
            <br/><br/>
            <div className="parentAddress">
            <h2>Адресные данные</h2>
            <FontAwesomeIcon icon="times" style={styles.close} onClick={this.props.modalClose}/>
            <br/>
               { addressArray.length > 0 ? addressForm : null }
                </div><br/>
            </Auxillay>
        );
    }
}

export default AddressForm;