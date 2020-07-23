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

import React, { FC, useContext } from 'react';
import { Progress, StatusOK, StatusError } from '@backstage/core';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
} from '@material-ui/core';

import { RootContext } from '../../context/RootContext';

type Workflow = {
  status: string; // "success"
  workflow: string; // "osx-pamparam-pimpirim"
  started: string; // 2020-07-19T06:01:18Z
  triggered: string; // 2020-07-19T06:01:18Z
  branch: string; // "master"
};

type GridElementProps = {
  apps: Workflow[];
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
});

export const GridElement: FC<GridElementProps> = ({ apps }) => {
  const { search, setSearch, view, setView } = useContext(RootContext);
  const classes = useStyles();

  const workflows = [];

  const data = apps
    .filter(
      app => app.branch === 'master' && app.original_build_params.workflow_id,
    )
    .filter(app => {
      const workflow = app.original_build_params.workflow_id;
      if (!workflows.includes(workflow)) {
        workflows.push(workflow);
        return true;
      }
      return false;
    })
    .map((app, index) => {
      const workflow = app.original_build_params.workflow_id;
      const stat =
        app.status === 1 ? (
          <StatusOK key={index.toString()} />
        ) : (
          <StatusError key={index.toString()} />
        );
      return (
        <Grid
          item
          xs={4}
          key={Math.floor(Math.random() * Math.floor(30000))}
          className={
            workflow.includes(search) || search === ''
              ? classes.show
              : classes.hide
          }
        >
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h4" component="h2">
                {stat} {workflow}
              </Typography>
              <Typography variant="h6" className={classes.pos} component="h4">
                <br />
                Started: {app.started_on_worker_at}
                <br />
                Triggered at: {app.triggered_at}
                <br />
                Branch: {app.branch}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={`https://app.bitrise.io/build/${app.slug}`}
              >
                Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  return data;
};

const BitriseCore: FC<{}> = () => {
  const config = require('./config.js');
  const { value, loading, error } = useAsync(async (): Promise<User[]> => {
    const response = await fetch(
      `https://api.bitrise.io/v0.1/apps/${config.app_slug}/builds`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: config.auth_token,
        },
      },
    );
    const data = await response.json();
    return data.data;
  }, []);

  if (loading) {
    return (
      <Grid item xs={12}>
        <Progress />
      </Grid>
    );
  } else if (error) {
    return (
      <Grid item xs={12}>
        <Alert severity="error">{error.message}</Alert>
      </Grid>
    );
  }

  return <GridElement apps={value || []} />;
};

export default BitriseCore;
