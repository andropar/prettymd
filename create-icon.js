const fs = require('fs');
const svg2img = require('svg2img');

const svgBuffer = fs.readFileSync('icon.svg');

svg2img(svgBuffer, { width: 128, height: 128 }, function(error, buffer) {
    if (error) {
        console.error('Error converting SVG:', error);
        process.exit(1);
    }
    fs.writeFileSync('icon.png', buffer);
    console.log('Icon created successfully: icon.png');
});
