
export default function getDominantColor(image) {
  if (!image) return null;
  return getColors(draw(image));
}

const draw = image => {
  const canvas = document.createElement("canvas");
  const c = canvas.getContext('2d');
  c.width = canvas.width = image.width;
  c.height = canvas.height = image.height;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(image, 0, 0, image.width , image.height);
  return c; // returns the context
}

const getColors = c => {
  let col, colors = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3]; // alpha
    // skip pixels > 50% transparent
    if (a < (255 * 0.5)) continue; 
    col = rgbToHex(r, g, b);
    if (!colors[col])
      colors[col] = 0;
    colors[col]++;
  }
  return colors;
}

const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255){
    throw "Invalid color component";
  }
  return ((r << 16) | (g << 8) | b).toString(16);
}

