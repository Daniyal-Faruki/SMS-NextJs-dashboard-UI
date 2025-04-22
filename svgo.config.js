// svgo.config.js
// SVGO will optimize your SVGs by stripping out width/height and other unnecessary attributes.
module.exports = {
    plugins: [
      {
        name: 'removeDimensions',
        active: true, // Removes width/height from SVG files
      },
    ],
  };
  