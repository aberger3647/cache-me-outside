import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Navigate } from 'react-router-dom'

const SignUpForm = () => {
    const { register, handleSubmit } = useForm();
    const [signup, { error, data }] = useMutation(ADD_USER);
    const [isHover, setIsHover] = useState(false);
    const [activeTab, setActiveTab] = useState('signup');

    const onSubmit = async (formData) => {
        console.log(formData)
        try {
            const { data } = await signup({
                variables: { email: formData.email, firstName: formData.firstName, password: formData.password },
            });
            
            Auth.login(data.addUser.token);
            console.log('signed up')
        } catch (err) {
            console.error(err);
        }
    }

    const styles = {
        form: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px'
        },
        input: {
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid white',
          padding: '10px',
          marginBottom: '10px',
          width: '100%',
          borderRadius: '10px',
          '::placeholder': { color: 'white' }
        },
        buttonContainer: {
          display: 'flex',
          width: '100%',
          marginBottom: '10px'
        },
        button: {
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid white',
          borderRadius: '20px',
          padding: '10px',
          margin: '10px',
          width: '50%',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-in-out'
        },
        activeButton: {
          backgroundColor: '#613cff',
          color: '#fff'
        },
        submitButton: {
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid white',
          borderRadius: '10px',
          padding: '10px',
          width: '100px',
          cursor: 'pointer',
          transition: 'opacity 0.3s ease-in-out'
        },
        submitButtonHover: {
          backgroundColor: '#613cff',
          opacity: '0.8',
          color: 'white'
        },
        h1: {
          color: 'white',
          textAlign: 'center',
        },
        h4: {
          color: 'white',
          textAlign: 'center'
        },
        p: {
          color: 'white'
        },
        };

    return (
        <div>
            {/* change to preferences later */}
            {Auth.loggedIn() && (
                <Navigate to="/explore" />
            )}
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <h4 style={styles.h4}>Sign Up</h4>
                <input {...register('firstName')} style={styles.input} placeholder="First Name" />
                <input {...register("email", { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} style={styles.input} placeholder="Email" />
                <input type="password" {...register("password")} style={styles.input} placeholder="Password" />
                <button
                  type="submit"
                  style={{ ...styles.submitButton, ...(isHover && styles.submitButtonHover) }}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;