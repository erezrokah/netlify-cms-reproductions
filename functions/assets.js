const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');

const apiToken = process.env.NETLIFY_API_TOKEN;
const apiUrl = process.env.API_URL;

const apiProxy = createProxyMiddleware({
  target: apiUrl,
  changeOrigin: true,
  headers: { Authorization: `Bearer: ${apiToken}` },
});

const app = express();
app.use('/*', apiProxy);

const handler = serverlessExpress({ app }).handler;

exports.handler = async (event, context) => {
  console.log(event);
  const { identity, user } = context.clientContext;

  console.log(user, identity);

  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });
    const text = await res.text();
    return {
      statusCode: res.status,
      body: text,
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: 'Unknown error' };
  }
};
