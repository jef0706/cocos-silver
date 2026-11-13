
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'q6kewfnt',
  dataset: 'production',
  apiVersion: '2026-10-29',
  useCdn: true,
  perspective: 'published',
});
