import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'mubashir-portfolio',
  title: 'Mubashir Hussain — Portfolio CMS',

  // TODO(mubashir): fill these in after running `pnpm sanity init` in this folder.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: { types: schemaTypes },
});
