import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import { useProfile } from '../../shared/hooks/GitHubHook.js';

import './User.css';

export default function User({login, nodeId, userId, html_url, avatar_url, profileApi, onCloseView} ){

    const profile = useProfile(profileApi);

    return (
    <Container >
        <Grid container className="user-container">
            <Grid item xs={12} sm={12} className="box-close">
                <CloseIcon className="close" onClick={()=>{onCloseView()}}></CloseIcon>
            </Grid>
            <Grid item xs={12} sm={12}>
            <Card className='card-box'>
                <div className="box-info">
                    <Avatar alt="Remy Sharp" src={avatar_url} className="avatar"/>
                </div>
                <div className="box-info">
                    Followers <strong>{profile.followers}</strong>
                </div>
                <div className="box-info">
                    Following <strong>{profile.following}</strong>
                </div>
                <div className="box-info">
                    <a href={html_url} target="_blank">Link Git</a>
                </div>
            </Card>
            <Card className="card-box">         
                <div>
                    <TextField
                        className="input-profile"
                        disabled
                        id="filled-disabled"
                        label="Login"
                        variant="filled"
                        value={login}
                    />
                </div>
                <div>
                    <TextField
                        className="input-profile"
                        disabled
                        id="filled-disabled"
                        label="Node"
                        variant="filled"
                        value={nodeId}
                    />
                </div>
                <div>
                    <TextField
                        className="input-profile"
                        disabled
                        id="filled-disabled"
                        label="User id"
                        variant="filled"
                        value={userId}
                    />
                </div>
            </Card>
            </Grid>
        </Grid>
        </Container>
    );
}