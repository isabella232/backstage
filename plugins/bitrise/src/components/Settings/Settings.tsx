/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { InfoCard } from '@backstage/core';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CardActions,
  CardContent,
} from '@material-ui/core';
import { RootContext } from '../../context/RootContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const Settings = () => {
  const classes = useStyles();
  const { search, setSearch, view, setView } = useContext(RootContext);

  const handleViewChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearch(event.target.value as string);
  };

  return (
    <InfoCard title="Settings">
      <CardContent>
        <form className={classes.root}>
          <InputLabel id="views-label">Views</InputLabel>
          <Select
            labelId="views-label"
            id="views"
            value={view}
            onChange={handleViewChange}
          >
            <MenuItem value="latest on master">Latest on master</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
          <br />
          <TextField id="standard-search" label="Search field" type="search" />
        </form>
      </CardContent>
      <CardActions>
        <TextField id="appslug" label="App Slug" variant="filled" />
        <TextField
          id="authorizationtoken"
          label="Authorization token"
          variant="filled"
        />
      </CardActions>
    </InfoCard>
  );
};

export default Settings;
