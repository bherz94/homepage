import * as qs from 'qs';

// export const homeQuery = qs.stringify({
//   populate: {
//     content: {
//       on: {
//         'text-components.text-with-image': {
//           populate: ['image'],
//         },
//         'hero-area.hero-area': {
//           populate: ['image'],
//         },
//       },
//     },
//   },
// });

export const homeQuery = qs.stringify({
  populate: 'heroArea.image',
});
