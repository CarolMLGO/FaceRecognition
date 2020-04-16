import React from 'react';
import {withRouter} from 'react-router-dom';
import { Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';
import Button from '../../../Components/UI/Button/Button';
import { url } from '../../../url';
import styles from './Register.module.css';

class Register extends React.Component {

    onSubmitRegister = (values) => {
        fetch(`${url}/register`, {
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
            })
    }

    render() {
        // const responseFacebook = (response) => {
        //     console.log(response);
        // }

        const responseGoogle = (response) => {
            console.log(response);
        }

        const validation_Yup = Yup.object({
                    name: Yup.string()
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required('Required'),
                    password: Yup.string()
                        .required('No password provided.') 
                        .min(8, 'Password is too short - should be 8 chars minimum.'),
                        // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                    password2: Yup.string()
                        .required("Required.")
                        .test("passwords-match","Passwords must match!",function(value){
                            return this.parent.password === value;
                        })
                });
        return (
            <Formik 
                initialValues={{name:'', email:'', password:'',password2:''}} 
                validationSchema = {validation_Yup}>
                {
                    (props) => {
                        const {values,isValid} = props;
                        return (
                            <div className={styles.Register}>
                                <div className={styles.Left}>
                                    <h1>Sign up</h1>
                                    <Field name="name" type="text" placeholder="Username"/>
                                    <ErrorMessage className={styles.error} name="name">
                                        {msg=><div className={styles.error}>{msg}</div>}
                                    </ErrorMessage>
                                    <Field name="email" type="text" placeholder="E-mail"/>
                                    <ErrorMessage className={styles.error} name="email">
                                        {msg=><div className={styles.error}>{msg}</div>}
                                    </ErrorMessage>
                                    <Field name="password" type="text" placeholder="Password"/>
                                    <ErrorMessage className={styles.error} name="password">
                                        {msg=><div className={styles.error}>{msg}</div>}
                                    </ErrorMessage>
                                    <Field name="password2" type="text" placeholder="Retype password" />
                                    <ErrorMessage className={styles.error} name="password2">
                                        {msg=><div className={styles.error}>{msg}</div>}
                                    </ErrorMessage>
                                    <Button marginProps='marginTopSmall' disabled={!isValid} clicked={()=>this.onSubmitRegister(values)}> Sign me up </Button>
                                </div>
                                <div className={styles.Right}>
                                    <span className={styles.loginwith}>Sign in with <br/> social network</span>
                                    <button className={[styles.social_signin,styles.facebook].join(' ')}>Log in with facebook</button>
                                    <button className={[styles.social_signin,styles.twitter].join(' ')}>Log in with Twitter</button>
                                    <button className={[styles.social_signin,styles.google].join(' ')}>Log in with Google+</button>
                                    <GoogleLogin
                                        clientId="698459763986-7t15fdr8aa6rvkj44mq6ttjmjiqm3p4a.apps.googleusercontent.com" //Creacted through https://console.developers.google.com/apis/credentials?project=prime-hydra-217402
                                        buttonText="LOGIN WITH GOOGLE"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                    />
                                    
                                </div>
                                <div className={styles.OR}>OR</div>
                            </div>
                        )
                    }
                }
            </Formik>
            )
    }
}

export default withRouter(Register);