exports.handler = async function(event, context) {
  const { ENV_1, ENV_2 } = process.env;
  return {
    statusCode: 200,
    body: `ENV_1=${ENV_1}, ENV_2=${ENV_2}`,
  };
};
