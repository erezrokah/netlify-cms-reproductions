const fetch = require('node-fetch');
const url = 'https://picsum.photos/seed/picsum/600/600';

const fs = require('fs');
const path = require('path');

const count = process.env.SEED_FILE_COUNT || 999;

const start = async () => {
  const dir = path.join(__dirname, 'static', 'images');
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < count; i++) {
    const id = `${i}`.padStart(`${count}`.length, '0');
    const url = `https://picsum.photos/seed/${id}/600/600`;
    const content = await fetch(url).then(res => res.buffer());
    fs.writeFileSync(path.join(dir, `image-${id}.jpg`), content);
  }
};

start();
