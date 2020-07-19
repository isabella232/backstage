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

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type Workflow = {
  workflow: string; // "osx-pamparam-pimpirim"
  status: string; // "success"
  started: string; // 2020-07-19T06:01:18Z
  triggered: string; // 2020-07-19T06:01:18Z
  branch: string; // "master"
};

type DenseTableProps = {
  apps: Workflow[];
};

export const DenseTable: FC<DenseTableProps> = ({ apps }) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Workflow', field: 'workflow' },
    { title: 'Status', field: 'status' },
    { title: 'Started', field: 'started' },
    { title: 'Triggered', field: 'triggered' },
    { title: 'Branch', field: 'branch' },
  ];

  const data = apps.map(app => {
    const stat = app.status ? <StatusOK /> : <StatusError />;
    return {
      workflow: app.triggered_workflow,
      status: stat,
      started: app.started_on_worker_at,
      triggered: app.triggered_at,
      branch: app.original_build_params.branch,
    };
  });

  return (
    <Table
      title="Bitrise workflows only latest and branch master"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

const ExampleFetchComponent: FC<{}> = () => {
  const { value, loading, error } = useAsync(async (): Promise<User[]> => {
    //    const response = await fetch('https://randomuser.me/api/?results=20');
    const response = await fetch(
      'https://api.bitrise.io/v0.1/apps/<slug>/builds',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: '<bitrise-access-token>',
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

export default ExampleFetchComponent;
