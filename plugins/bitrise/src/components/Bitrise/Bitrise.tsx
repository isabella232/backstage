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
import { Grid } from '@material-ui/core';
import { Header, Page, pageTheme, Content } from '@backstage/core';
import BitriseCore from '../BitriseCore';
import Settings from '../Settings';
import RootContext from '../../context/RootContext';

const Bitrise: FC<{}> = () => (
  <RootContext>
    <Page theme={pageTheme.tool}>
      <Header title="Welcome to Bitrise Builds!" />
      <Content>
        <Grid container spacing={3}>
          <BitriseCore />
        </Grid>
      </Content>
    </Page>
  </RootContext>
);

export default Bitrise;
