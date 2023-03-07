import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Auth from '../utils/auth';

import Header from '../components/Header';
import Upload from '../components/Upload';

import { EDIT_PROFILE } from '../utils/mutations';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const EditProfile = () => {
    const { register, handleSubmit, reset } = useForm();
    const { loading, data: userData } = useQuery(GET_ME, {
        onCompleted: (data) => {
            console.log('got data from graphql', data.me.profile);
            reset(data.me.profile);
        }
    });

    const [editProfile, { error, data }] = useMutation(EDIT_PROFILE);

    const onSubmit = async (formData) => {
        // removes typename from variables so mutation doesn't include __typename
        const {__typename: _, ...profile } = formData;
        console.log('sending profile', profile);
        try {
            const { data } = await editProfile({
                variables: {profile},
            });
            alert('saved profile');
        } catch (err) {
            console.error(err);
            alert('failed to set profile' + err);
        }
    }

    if (loading) {
    return <div>Loading...</div>;
    }

    return (
        
        <div className='contentContainer createProfile'>
            { !Auth.loggedIn() && <Navigate to='/login' /> }
            <Header title="edit profile" />

            <h2>Name</h2>
            <div className='formContainer'>

                <Upload />

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input {...register('age')}
                        placeholder='Age'
                    />

                    <select {...register('gender', { required: true })} >
                        <option value=''>Gender...</option>
                        <option value='F'>Female</option>
                        <option value='M'>Male</option>
                        <option value='NB'>Non-Binary</option>
                    </select>

                    <select {...register('height', { required: true })} >
                        <option value=''>Height...</option>
                        <option value="4'5&quot;">4'5"</option>
                        <option value="4'6&quot;">4'6"</option>
                        <option value="4'7&quot;">4'7"</option>
                        <option value="4'8&quot;">4'8"</option>
                        <option value="4'9&quot;">4'9"</option>
                        <option value="4'10&quot;">4'10"</option>
                        <option value="4'11&quot;">4'11"</option>
                        <option value="5'0&quot;">5'0"</option>
                        <option value="5'1&quot;">5'1"</option>
                        <option value="5'2&quot;">5'2"</option>
                        <option value="5'3&quot;">5'3"</option>
                        <option value="5'4&quot;">5'4"</option>
                        <option value="5'5&quot;">5'5"</option>
                        <option value="5'6&quot;">5'6"</option>
                        <option value="5'7&quot;">5'7"</option>
                        <option value="5'8&quot;">5'8"</option>
                        <option value="5'9&quot;">5'9"</option>
                        <option value="5'10&quot;">5'10"</option>
                        <option value="5'11&quot;">5'11"</option>
                        <option value="6'0&quot;">6'0"</option>
                        <option value="6'1&quot;">6'1"</option>
                        <option value="6'2&quot;">6'2"</option>
                        <option value="6'3&quot;">6'3"</option>
                        <option value="6'4&quot;">6'4"</option>
                        <option value="6'5&quot;">6'5"</option>
                        <option value="6'6&quot;">6'6"</option>
                        <option value="6'7&quot;">6'7"</option>
                    </select>

                    <select {...register('religion', { required: true })} >
                        <option value=''>Religion...</option>
                        <option value='Agnostic/Atheist'>Agnostic/Atheist</option>
                        <option value='Buddhist'>Buddhist</option>
                        <option value='Christian'>Christian</option>
                        <option value='Hindu'>Hindu</option>
                        <option value='Jewish'>Jewish</option>
                        <option value='Spiritual'>Spiritual</option>
                    </select>

                    <select {...register('politics', { required: true })} >
                        <option value=''>Politics...</option>
                        <option value='Conservative'>Conservative</option>
                        <option value='Moderate'>Moderate</option>
                        <option value='Liberal'>Liberal</option>
                    </select>

                    <select {...register('smoking', { required: true })}  >
                        <option value=''>Smoking...</option>
                        <option value='Smokes'>Smokes</option>
                        <option value='Doesnt Smoke'>Doesn't smoke</option>
                    </select>

                    <select {...register('drinking', { required: true })} >
                        <option value=''>Drinking...</option>
                        <option value='Drinks'>Drinks</option>
                        <option value='Doesnt Drink'>Doesn't drink</option>
                    </select>

                    <textarea {...register('bio')}
                        placeholder='Bio'
                    />

                    <input type='submit' value='Save' />
                </form>
            </div>
        </div>
    )
};

export default EditProfile;