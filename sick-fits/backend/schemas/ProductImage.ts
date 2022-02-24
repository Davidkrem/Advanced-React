import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import 'dotenv/config';

// console.log('-------------------------------------');
// console.log(process.env.CLOUDINARY_SECRET);

export const cloudinary = {
  // cloudinary config
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sickfits',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary, // cloudinary config
      label: 'Source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photo' }), // relationship of Image to Product
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});
