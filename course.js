var DynamoDB = require('aws-sdk/clients/dynamodb');
var DocumentClient = new DynamoDB.DocumentClient({
    // endpoint: 'http://localhost:8000',
    region: 'ap-south-1',
    maxRetries: 3,
    httpOptions: {
        timeout: 5000,
    }
});

const COURSE_TABLE_NAME = process.env.COURSE_TABLE_NAME;
const RESOURCE_TABLE_NAME = process.env.RESOURCE_TABLE_NAME;
const call = require("./call");

const getCORSHeaders = () => ({
  'Access-Control-Allow-Origin': '*', // Replace with your frontend origin
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': '*',
  'Accept': '*/*',
  "Content-Type": "application/json"
});



const createCourse = async(event, context, callback) => {
    let data = JSON.parse(event.body);
    try{
        const params = {
            TableName: COURSE_TABLE_NAME,
            Item: {
                UserId: data.UserId,
                CourseId: data.CourseId,
                CourseName: data.CourseName,
                CourseDescription: data.CourseDescription,
                CourseObjectives: data.CourseObjectives,
            },
            ConditionExpression: 'attribute_not_exists(UserId) AND attribute_not_exists(CourseId)',
        }
        await DocumentClient.put(params).promise()
        const response = {
          statusCode: 201,
          body: JSON.stringify(data),
          headers: getCORSHeaders(),
        };
        callback(null, response);
      } catch (err) {
        const response = {
          statusCode: 500,
          body: err.message,
          headers: getCORSHeaders(),
        };
        callback(null, response);
      }
}

const createCourseText = async(event, context, callback) => {
  let data = JSON.parse(event.body);
  try{
      const params = {
          TableName: COURSE_TABLE_NAME,
          Item: {
              UserId: data.UserId,
              CourseId: data.CourseId,
              CourseName: data.CourseName,
              CourseDescription: data.CourseDescription,
              CourseObjectives: data.CourseObjectives,
              CourseTextEditor: data.CourseTextEditor,
          },
          ConditionExpression: 'attribute_not_exists(UserId) AND attribute_not_exists(CourseId)',
      }
      await DocumentClient.put(params).promise()
      const response = {
        statusCode: 201,
        body: JSON.stringify(data),
        headers: getCORSHeaders(),
      };
      callback(null, response);
    } catch (err) {
      const response = {
        statusCode: 500,
        body: err.message,
        headers: getCORSHeaders(),
      };
      callback(null, response);
    }
}

const getCourseData = async (event, context, callback) => {
    let userId = event['queryStringParameters']['UserId'];
    let courseId = event['queryStringParameters']['CourseId'];
  
    try {
      const params = {
        TableName: COURSE_TABLE_NAME,
        KeyConditionExpression: 'UserId = :uid AND CourseId = :cid',
        ExpressionAttributeValues: {
            ':uid': userId ,
            ':cid': courseId, 
        }
      };
  
      let data = await DocumentClient.query(params).promise();
      
      if (data.Items.length > 0) {
        callback(null, call.statement(200, data.Items));
      } else {
        callback(null, call.statement(404, 'Course not found'));
      }
    } catch (err) {
      callback(null, call.statement(500, err.message));
    }
  };


  // const getCourseData2 = async (event, context, callback) => {
  //   let courseId = event.pathParameters.CourseId;
  //   let userId = event.pathParameters.UserId;
  
  //   try {
  //     const params = {
  //       TableName: COURSE_TABLE_NAME,
  //       KeyConditionExpression: 'UserId = :uid AND CourseId = :cid',
  //       ExpressionAttributeValues: {
  //         ':uid': userId,
  //         ':cid': courseId,
  //       },
  //     };
  
  //     let data = await DocumentClient.query(params).promise();
  
  //     if (data.Items.length > 0) {
  //       const response = {
  //         statusCode: 200,
  //         body: JSON.stringify(data.Items),
  //         headers: getCORSHeaders(),
  //       };
  //       callback(null, response);
  //     } else {
  //       const response = {
  //         statusCode: 404,
  //         body: 'Course not found',
  //         headers: getCORSHeaders(),
  //       };
  //       callback(null, response);
  //     }
  //   } catch (err) {
  //     const response = {
  //       statusCode: 500,
  //       body: err.message,
  //       headers: getCORSHeaders(),
  //     };
  //     callback(null, response);
  //   }
  // };

  const getCourseData2 = async (event, context, callback) => {
    let courseId = event.pathParameters.CourseId;
    let userId = event.pathParameters.UserId;
  
    try {
      const params = {
        TableName: COURSE_TABLE_NAME,
        KeyConditionExpression: 'UserId = :uid AND CourseId = :cid',
        ExpressionAttributeValues: {
          ':uid': userId,
          ':cid': courseId,
        },
      };
  
      let data = await DocumentClient.query(params).promise();
  
      if (data.Items.length > 0) {
        const response = {
          statusCode: 200,
          body: JSON.stringify(data.Items),
          headers: getCORSHeaders(),
        };
        callback(null, response);
      } else {
        const response = {
          statusCode: 404,
          body: 'Course not found',
          headers: getCORSHeaders(),
        };
        callback(null, response);
      }
    } catch (err) {
      const response = {
        statusCode: 500,
        body: err.message,
        headers: getCORSHeaders(),
      };
      callback(null, response);
    }
  };

  const getAllCoursesByUser = async (event, context, callback) => {
    const userId = event.pathParameters.UserId;
  
    try {
      const params = {
        TableName: COURSE_TABLE_NAME,
        KeyConditionExpression: 'UserId = :uid',
        ExpressionAttributeValues: {
          ':uid': userId,
        },
      };
  
      const data = await DocumentClient.query(params).promise();
  
      if (data.Items.length > 0) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data.Items),
          headers: getCORSHeaders(),
        });
      } else {
        callback(null, {
          statusCode: 404,
          body: 'No courses found for the user',
          headers: getCORSHeaders(),
        });
      }
    } catch (err) {
      callback(null, {
        statusCode: 500,
        body: err.message,
        headers: getCORSHeaders(),
      });
    }
  };

  const updateCourse = async (event, context, callback) => {
    let data = JSON.parse(event.body);
    let courseId = event.pathParameters.CourseId;
    let userId = event.pathParameters.UserId;
  
    try {
      const params = {
        TableName: COURSE_TABLE_NAME,
        Key: {
          UserId: userId,
          CourseId: courseId,
        },
        UpdateExpression: 'SET CourseName = :name, CourseDescription = :description, CourseObjectives = :objectives',
        ExpressionAttributeValues: {
          ':name': data.CourseName,
          ':description': data.CourseDescription,
          ':objectives': data.CourseObjectives,
        },
        ReturnValues: 'ALL_NEW',
      };
  
      let updatedItem = await DocumentClient.update(params).promise();
  
      const response = {
        statusCode: 200,
        body: JSON.stringify(updatedItem.Attributes),
        headers: getCORSHeaders(),
      };
  
      callback(null, response);
    } catch (err) {
      const response = {
        statusCode: 500,
        body: err.message,
        headers: getCORSHeaders(),
      };  
      callback(null, response);
    }
  };

  const updateCourseText = async (event, context, callback) => {
    let data = JSON.parse(event.body);
    let courseId = event.pathParameters.CourseId;
    let userId = event.pathParameters.UserId;
  
    try {
      const params = {
        TableName: COURSE_TABLE_NAME,
        Key: {
          UserId: userId,
          CourseId: courseId,
        },
        UpdateExpression: 'SET CourseName = :name, CourseDescription = :description, CourseObjectives = :objectives, CourseTextEditor = :textEditor',
        ExpressionAttributeValues: {
          ':name': data.CourseName,
          ':description': data.CourseDescription,
          ':objectives': data.CourseObjectives,
          ':textEditor': data.CourseTextEditor
        },
        ReturnValues: 'ALL_NEW',
      };
  
      let updatedItem = await DocumentClient.update(params).promise();
  
      const response = {
        statusCode: 200,
        body: JSON.stringify(updatedItem.Attributes),
        headers: getCORSHeaders(),
      };
  
      callback(null, response);
    } catch (err) {
      const response = {
        statusCode: 500,
        body: err.message,
        headers: getCORSHeaders(),
      };  
      callback(null, response);
    }
  };

  // const deleteCourse = async (event, context, callback) => {
  //   const courseId = event.pathParameters.CourseId;
  //   const userId = event.pathParameters.UserId;
  
  //   try {
  //     const params = {
  //       TableName: COURSE_TABLE_NAME,
  //       Key: {
  //         UserId: userId,
  //         CourseId: courseId,
  //       },
  //     };
  
  //     await DocumentClient.delete(params).promise();
  
  //     callback(null, {
  //       statusCode: 200,
  //       body: 'Course deleted successfully',
  //     });
  //   } catch (err) {
  //     callback(null, {
  //       statusCode: 500,
  //       body: err.message,
  //     });
  //   }
  // };


  const deleteCourse = async (event, context, callback) => {
    const courseId = event.pathParameters.CourseId;
    const userId = event.pathParameters.UserId;
  
    try {
      const getResourcesParams = {
        TableName: RESOURCE_TABLE_NAME,
        KeyConditionExpression: 'CourseId = :courseId',
        ExpressionAttributeValues: {
          ':courseId': courseId
        }
      };
  
      const resourcesResponse = await DocumentClient.query(getResourcesParams).promise();
      const deleteResourcePromises = resourcesResponse.Items.map(resource => {
        const deleteParams = {
          TableName: RESOURCE_TABLE_NAME,
          Key: {
            CourseId: resource.CourseId,
            CourseResourceId: resource.CourseResourceId
          },
          ConditionExpression: 'attribute_exists(CourseResourceId)'
        };
        return DocumentClient.delete(deleteParams).promise();
      });
  
      await Promise.all(deleteResourcePromises);
  
      const deleteCourseParams = {
        TableName: COURSE_TABLE_NAME,
        Key: {
          UserId: userId,
          CourseId: courseId,
        },
      };
  
      await DocumentClient.delete(deleteCourseParams).promise();
      callback(null, call.statement(200, { message: 'Resource deleted successfully' }));
      // callback(null, {
      //   statusCode: 200,
      //   body: JSON.stringify({ message: 'Course deleted successfully' })
      // });
    } catch (err) {
      callback(null, call.statement(500, err.message));
      // callback(null, {
      //   statusCode: 500,
      //   body: JSON.stringify({ error: err.message })
      // });
    }
  };
  
  
  
  
  
module.exports = {createCourse, createCourseText, getCourseData, getCourseData2, getAllCoursesByUser, updateCourse, updateCourseText, deleteCourse}
