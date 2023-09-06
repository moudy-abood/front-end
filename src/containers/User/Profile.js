import React from 'react';
import  { useDispatch, useSelector }  from 'react-redux';
import { fetchProfile } from '../../store/actions/profile';


function Profile() {
    const profileData= useSelector(state=> state.profileReducer)
    const dispatch =useDispatch()
    dispatch(fetchProfile())
    return (
        <div>
            <p>{profileData.name}</p>
            <p>{profileData.phoneNumber}</p>
            <p>{profileData.email}</p>
        </div>
    )
}
export default Profile;
