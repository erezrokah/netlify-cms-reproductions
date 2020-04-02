exports.handler = async function (event) {
  try {
    const message = `Env variable 'TEST' value is ${process.env.TEST}`;
    return { status: 200, body: message };
  } catch (e) {
    console.log(e);
    const response = {
      body: 'Unauthorized',
      status: 401,
    };
    return response;
  }
};
