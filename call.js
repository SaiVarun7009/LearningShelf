let CourseId = "";
let UserId = "";

const getUserId = (headers) => {
  UserId = headers.UserId;
  return UserId;
};

const getCourseId = (headers) => {
  CourseId = headers.CourseId;
  return CourseId;
};

const statement = (statusCode, data) => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': "*",
      'Access-Control-Allow-Credentials': true,
      'Accept': '*/*',
      'Content-Type': 'application/json',
      // 'CourseId': "Course13329",
      // 'UserId': "User23398",
    }
  };
};

module.exports = {
  statement,
  getCourseId,
  getUserId
};
