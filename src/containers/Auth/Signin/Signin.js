import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Button from '../../../Components/UI/Button/Button';
import { url } from '../../../url';
import styles from './Signin.module.css';

class Signin extends React.Component {
    onSubmitSignIn = (values) => {
        fetch(`${url}/signin`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.history.push('/');
            }
        })}

    render() {
        const validation_Yup = Yup.object({
                    email: Yup.string()
                        .email("Invalid email address")
                        .required('Required'),
                    password: Yup.string()
                        .required('No password provided.') 
                        // .min(8, 'Password is too short - should be 8 chars minimum.')
                        // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                });

        return (<Formik 
                initialValues={{email:'', password:''}} 
                validationSchema = {validation_Yup}>
                {
                    (props) => {
                        const {values,isValid} = props
                        return (
                            <div className={styles.Signin}>
                                <div className={styles.Form} >
                                    <h1>Sign In</h1>                              
                                    <Field name="email" type="text" placeholder="E-mail"/>
                                    <ErrorMessage className={styles.error} name="email">
                                        {msg=><div className={styles.error}>{msg}</div>}
                                    </ErrorMessage>
                                    <Field name="password" type="text" placeholder="password"/>
                                    <ErrorMessage className={styles.error} name="password">
                                        {msg=><div className={styles.error}>{msg}</div>}
                                    </ErrorMessage>                                
                                    <Button marginProps='marginTopSmall' disabled={!isValid} clicked={()=>this.onSubmitSignIn(values)}> Sign In </Button>
                                    <div className={styles.Signin_Register}>
                                        <Link to="/register">Register</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </Formik>)   
}}

export default withRouter(Signin);





