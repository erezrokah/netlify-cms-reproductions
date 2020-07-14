const { promises: fs } = require('fs');
const path = require('path');

const template = `---
title: TITLE_PLACEHOLDER
lang: LOCALE_PLACEHOLDER
---
`;

const seed = async () => {
  const locales = ['en', 'es'];
  const dir = path.join('content', 'posts');

  await fs.mkdir(dir, { recursive: true });

  const itemsPerLocale = 100;
  for (let i = 1; i <= locales.length * itemsPerLocale; i++) {
    const locale = locales[Math.floor((i - 1) / itemsPerLocale)];
    const count = `${i}`.padStart(3, '0');
    const title = `${locale.toUpperCase()} Post ${count}`;
    const slug = title.toLowerCase().replace(/\s/g, '-');
    const file = path.join(dir, `${slug}-${locale}.md`);
    const content = template
      .replace('TITLE_PLACEHOLDER', title)
      .replace('LOCALE_PLACEHOLDER', locale);
    await fs.writeFile(file, content);
  }
};

seed();
