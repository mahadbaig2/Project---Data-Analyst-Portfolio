'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectId, dataset } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Mirza Hammad Baig — Portfolio Studio',
  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool({ structure }),
  ],
});
