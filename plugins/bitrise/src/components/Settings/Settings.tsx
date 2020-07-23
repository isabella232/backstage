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
    setView(event.target.value as string);
  };

  const handleSearchChange = ev => {
    setSearch(ev.target.value);
  };

  return (
    <InfoCard title="Settings">
      <CardContent>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          onChange={handleSearchChange}
        />
      </CardContent>
    </InfoCard>
  );
};

export default Settings;
