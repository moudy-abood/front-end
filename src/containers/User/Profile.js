import React from 'react';
import  { useDispatch, useSelector }  from 'react-redux';
import { fetchProfile } from '../../store/actions/profile';


function Profile() {
    const { name, phoneNumber, email }= useSelector(state=> state.profileReducer)
    const dispatch =useDispatch()
    dispatch(fetchProfile())
    return (
        <div>
            <p>{name}</p>
            <p>{phoneNumber}</p>
            <p>{email}</p>
        </div>
    )
}
export default Profile;
