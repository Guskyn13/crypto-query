import sanityClient from '@sanity/client';
import imgURLBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECTID,
    dataset: 'production',
    apiVersion: '2022-01-24',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imgURLBuilder(client);

export const urlFor = (source) => builder.image(source);