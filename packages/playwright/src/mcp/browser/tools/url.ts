/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { z } from '../../sdk/bundle';
import { defineTool } from './tool';

const resolveUrl = defineTool({
  capability: 'core',

  schema: {
    name: 'browser_resolve_url',
    title: 'Resolve short URL id',
    description: 'Given a short id like U1, returns the original URL if known',
    inputSchema: z.object({
      id: z.string().describe('The short id to resolve (e.g. U1)'),
    }),
    type: 'readOnly',
  },

  handle: async (context, params, response) => {
    if (!context.config.shortenUrls) {
      response.addResult('URL shortening is disabled. Set PLAYWRIGHT_MCP_SHORTEN_URLS=1 to enable.');
      return;
    }
    const url = context.urlRegistry().resolve(params.id);
    response.addResult(url ? url : `Not found: ${params.id}`);
  },
});

export default [
  resolveUrl,
];


