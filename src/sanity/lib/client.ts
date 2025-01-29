import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'



export const client = createClient({
  projectId:"3yf7dqvf",
  dataset:"production",
  apiVersion:'2021-03-25',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})


// Function to generate image URLs from Sanity's image field
export function urlFor(source: any) {
  return imageUrlBuilder(client).image(source);
};