const fs = require('fs');
const path = require('path');

const template = `---
title: VALUE
---
`;

const count = process.env.SEED_FILE_COUNT || 100;

const start = () => {
  const dir = path.join(__dirname, 'content', 'posts');
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < count; i++) {
    fs.writeFileSync(
      path.join(dir, `post-${i}.md`),
      template.replace('VALUE', `Title ${i}`),
    );
  }
};

start();
