const fs = require('fs');
const path = require('path');

const template = `---
title: TITLE_VALUE
date: DATE_VALUE
description: DESCRIPTION_VALUE
---
`;

const count = process.env.SEED_FILE_COUNT || 500;

const collections = [
  { name: 'posts', singular: 'Post' },
  { name: 'pages', singular: 'Page' },
];
const start = () => {
  collections.forEach(({ name, singular }) => {
    const dir = path.join(__dirname, 'content', name);
    fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < count; i++) {
      const id = `${i}`.padStart(`${count}`.length, '0');
      const title = id;
      const description = `${id % 20}`.padStart(`${count}`.length, '0');
      fs.writeFileSync(
        path.join(dir, `${singular.toLowerCase()}-${title}.md`),
        template
          .replace('TITLE_VALUE', `${singular} title ${id}`)
          .replace('DATE_VALUE', new Date(i * 1000000).toISOString())
          .replace(
            'DESCRIPTION_VALUE',
            `${singular} description ${description}`,
          ),
      );
    }
  });
};

start();
