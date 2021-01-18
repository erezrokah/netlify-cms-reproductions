const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiToken = process.env.NETLIFY_API_TOKEN;
const apiHost = process.env.API_HOST;
const apiPath = process.env.API_PATH;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Credentials': true,
};

const apiProxy = createProxyMiddleware({
  target: apiHost,
  changeOrigin: true,
  headers: {
    ...cors,
    Authorization: `Bearer ${apiToken}`,
  },
  pathRewrite: {
    '^/.netlify/functions/assets': apiPath,
  },
});

const app = express();
app.use(apiProxy);

const handler = serverlessExpress({ app }).handler;

exports.handler = async (event, context, callback) => {
  console.log(event);

  if (event.httpMethod !== 'OPTIONS') {
    const { user } = context.clientContext;
    const roles = user && user.app_metadata && user.app_metadata.roles;
    if (!Array.isArray(roles) || !roles.includes('admin')) {
      return {
        statusCode: 401,
        body: 'Unauthorized',
        headers: { ...cors },
      };
    }
  }

  return handler(
    { ...event, requestContext: { stage: 'prod' } },
    context,
    callback,
  );
};
