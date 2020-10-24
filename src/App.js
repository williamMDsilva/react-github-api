import React from 'react';
import { useState } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import List from './modules/list/List.jsx';
import User from './modules/user/User.jsx';

import { useList } from './shared/hooks/GitHubHook.js';

import './App.css';

function UserView(isUserView, item, handleCloseView) {
  if (isUserView) {
    return (<User
      login={item.login}
      nodeId={item.node_id}
      userId={item.id}
      html_url={item.html_url}
      avatar_url={item.avatar_url}
      profileApi={item.url}
      onCloseView={handleCloseView} />);
  }
  return null;
}

export default function App() {
  const [isDeletedList, setDeletedList] = useState(false);
  const [isUserView, setUserView] = useState(false);
  const [itemShow, setItemShow] = useState(false);

  const [active, setActive] = useList();
  const [deleted, setDeleted] = useState([]);

  function handleDelete(index) {
    const item = active[index];
    const newActive = active.filter((item, indexItem) => indexItem != index);
    setDeleted([...deleted, item]);
    setActive(newActive)
  }

  function handleRestore(item) {
    const newDeleted = deleted.filter((deletedItem) => deletedItem.id != item.id);
    setDeleted(newDeleted);
    setActive([...active, item]);
  }

  function handelViewItem(item) {
    setUserView(true);
    setItemShow(item);
  }

  function handleCloseView() {
    setItemShow(null);
    setUserView(false);
  }

  function handleShowList() {
    setDeletedList(!isDeletedList);
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <h1>Git Hub Users</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List
            data={isDeletedList ? deleted : active}
            isDeletedList={isDeletedList}
            onDelete={handleDelete}
            onRestore={handleRestore}
            onViewItem={handelViewItem}
          />
          <Fab
            id="fab-float-top"
            variant="extended"
            size="medium"
            color="primary"
            onClick={handleShowList}>
            <RestoreFromTrashIcon />
            {isDeletedList ? 'Active' : 'Deleted'}
          </Fab>
        </Grid>
        <Grid item xs={12} sm={6}>
          {UserView(isUserView, itemShow, handleCloseView)}
        </Grid>
      </Grid>

    </Container>
  );
}
