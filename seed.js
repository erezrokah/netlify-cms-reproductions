const fs = require('fs');
const path = require('path');

const template = `---
title: VALUE
---
`;

const count = process.env.SEED_FILE_COUNT || 3000;

const start = () => {
  const dir = path.join(__dirname, 'content', 'posts');
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < count; i++) {
    const id = `${i}`.padStart(`${count}`.length, '0');
    fs.writeFileSync(
      path.join(dir, `post-${id}.md`),
      template.replace('VALUE', `Title ${i}`),
    );
  }
};

start();
