const { BUCKET_NAME } = require("../../config/constants");

const awsResourceUrl = (resourceKey) =>
  `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/${resourceKey
    .split(" ")
    .join("+")}`;

module.exports = {
  awsResourceUrl,
};
