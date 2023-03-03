import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            me {
                _id
                email
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, email: $email, password: $password) {
            token
            me {
                _id
                firstName
                email
            }
        }
    }    
`

export const ADD_PROFILE = gql`
    mutation addProfile($profile: ProfileInput!) {
        addProfile(profile: $profile) {
                _id
                age
                gender
                height
                religion
                politics
                smoking
                drinking
                bio
            
        }
    }
`