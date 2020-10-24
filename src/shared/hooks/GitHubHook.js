import { useState, useEffect } from 'react';

import GitHubApi from '../resources/GitHubResource.js';
import UserModel from '../models/UserModel.js';
import ProfileModel from '../models/ProfileModel.js';

export function useList(){
    const [active, setActive] = useState([]);

    useEffect(() => {
        function fetch(){
            GitHubApi.list().then((resactive)=>{
                let data = resactive?.map(user => new UserModel(user));
                setActive(data)
            });
        }
    
        return fetch()
    }, []);

    return [active, setActive];
}

export function useProfile(profileApi){
    const [profile, setProfile] = useState({});
    
    useEffect(() => {
        async function fetch(){
            GitHubApi.profile(profileApi).then((prof) => setProfile(new ProfileModel(prof)));
        }
        fetch()
    }, [profileApi]);

    return profile;
}