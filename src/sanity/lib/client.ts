import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId:"3yf7dqvf",
  dataset:"production",
  apiVersion:'2021-03-25',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Function to generate image URLs from Sanity's image field
export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
};

// Removed redundant imageUrlBuilder function definition
