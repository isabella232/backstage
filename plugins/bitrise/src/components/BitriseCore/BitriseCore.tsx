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

import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableColumn,
  Progress,
  StatusOK,
  StatusError,
} from '@backstage/core';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';

type Workflow = {
  status: string; // "success"
  workflow: string; // "osx-pamparam-pimpirim"
  started: string; // 2020-07-19T06:01:18Z
  triggered: string; // 2020-07-19T06:01:18Z
  branch: string; // "master"
};

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type DenseTableProps = {
  apps: Workflow[];
};

export const DenseTable: FC<DenseTableProps> = ({ apps }) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Workflow', field: 'workflow' },
    { title: 'Started', field: 'started' },
    { title: 'Triggered', field: 'triggered' },
    { title: 'Branch', field: 'branch' },
  ];

  const data = apps.map(app => {
    const stat = app.status === 1 ? <StatusOK /> : <StatusError />;
    return {
      workflow: [stat, app.original_build_params.workflow_id],
      started: app.started_on_worker_at,
      triggered: app.triggered_at,
      branch: app.original_build_params.branch,
    };
  });

  return (
    <Table
      title="Bitrise workflows only latest and branch master"
      options={{ search: true, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

const BitriseCore: FC<{}> = () => {
  const config = require('./config.js');
  const { value, loading, error } = useAsync(async (): Promise<User[]> => {
    //    const response = await fetch('https://randomuser.me/api/?results=20');
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
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable apps={value || []} />;
};

export default BitriseCore;
