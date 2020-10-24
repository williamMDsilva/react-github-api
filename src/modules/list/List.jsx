import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GitHubIcon from '@material-ui/icons/GitHub';
import CircularProgress from '@material-ui/core/CircularProgress';

import searchUser from '../../shared/libs/searchUser.js';

import './List.css';

function handleLoading(dataSearched, isDeletedList, onRestore, onDelete, onViewItem) {
    if(dataSearched.length > 0){
        return renderContent(dataSearched, isDeletedList, onRestore, onDelete, onViewItem);
    }

    if(isDeletedList){
       return <div className="box-loading">
            No user!!
        </div>
    }

    if (!isDeletedList && dataSearched.length == 0) {
        return (<div className="box-loading">
            <CircularProgress color="secondary" />
        </div>);
    }

}

function renderActionDeletedList(item, onRestore) {
    return <a onClick={() => { onRestore(item) }}>Active</a>
}

function renderActionActiveList(index, item, onDelete, onViewItem) {
    return (
        <>
            <a onClick={() => { onViewItem(item) }}>
                <VisibilityIcon classeName="action-button" />
            </a>
            <a onClick={() => { onDelete(index) }}>
                <HighlightOffIcon classeName="action-button" />
            </a>
            <a onClick={() => { window.open(item.html_url, "_blank", "location=yes,scrollbars=yes,status=yes"); }}>
                <GitHubIcon classeName="action-button" />
            </a>
        </>
    )
}

function renderContent(data, isDeletedList, onRestore, onDelete, onViewItem) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">Login</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell align="center">
                            {item.login}
                        </TableCell>
                        <TableCell align="center">
                            {isDeletedList ? renderActionDeletedList(item, onRestore) : renderActionActiveList(index, item, onDelete, onViewItem)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default function List({ data, isDeletedList, onDelete, onRestore, onViewItem }) {
    const [search, setSearch] = useState('');

    const dataSearched = searchUser(search, data);

    const isLoading = dataSearched.length == 0;

    return (
        <Grid container fixed>
            <Grid item xs={12} sm={12}>
                <TextField className="input-search" id="outlined-basic" label="Search ..." variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={12}>
                {handleLoading(dataSearched, isDeletedList, onRestore, onDelete, onViewItem)}
            </Grid>
        </Grid>
    );
}
