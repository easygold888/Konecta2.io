import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = {
  'earth_clouds.png': 'https://clouds.matteason.co.uk/images/2048x1024/clouds-alpha.png'
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const [filename, url] of Object.entries(urls)) {
    const dest = path.join(publicDir, filename);
    console.log(`Downloading ${url} to ${dest}...`);
    try {
      await download(url, dest);
      console.log(`Downloaded ${filename} successfully.`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err);
    }
  }
}

main();
