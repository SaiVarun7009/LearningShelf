var DynamoDB = require('aws-sdk/clients/dynamodb');
var DocumentClient = new DynamoDB.DocumentClient({
    // endpoint: 'http://localhost:8000',
    region: 'ap-south-1',
    maxRetries: 3,
    httpOptions: {
        timeout: 5000,
    }
});

const RESOURCE_TABLE_NAME = process.env.RESOURCE_TABLE_NAME;
const call = require("./call");

// const getCORSHeaders = () => ({
//   'Access-Control-Allow-Origin': '*', // Replace with your frontend origin
//   'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
//   'Access-Control-Allow-Methods': '*',
//   'Accept': '*/*',
//   "Content-Type": "application/json"
// });

const CreateResource = async(event, context, callback) => {
    let data = JSON.parse(event.body);
    try{
        const params = {
            TableName: RESOURCE_TABLE_NAME,
            Item: {
                CourseId: data.CourseId,
                CourseResourceId: data.ResourceId,
                ResourceName: data.ResourceName,
                ResourceType: data.ResourceType, 
                ResourceData: {
                    Links: data.Links.map(link => ({
                        Link: link.Link,
                        Description: link.Description
                    }))
                },
            },
            ConditionExpression: 'attribute_not_exists(UserId) AND attribute_not_exists(CourseId)',
        }
        await DocumentClient.put(params).promise()
        callback(null, call.statement(201, data));
      } catch (err) {
        callback(null, call.statement(500, err.message));
      }
}

const getAllResourcesofACourse = async (event, context, callback) => {
    const CourseId = event.pathParameters.CourseId;
  
    try {
      const params = {
        TableName: RESOURCE_TABLE_NAME,
        KeyConditionExpression: 'CourseId = :cid',
        ExpressionAttributeValues: {
          ':cid': CourseId,
        },
      };
  
      const data = await DocumentClient.query(params).promise();
  
      if (data.Items.length > 0) {
        callback(null, call.statement(200, data.Items))
      } else {
        console.log(CourseId);
        callback(null, call.statement(404, "No Resoures found for the Course"))
      }
    } catch (err) {
        callback(null, call.statement(500, err.message));
    }
};


const updateCourseSpecificResource = async (event, context, callback) => {
    let data = JSON.parse(event.body);
    const CourseId = event.pathParameters.CourseId;
    const CourseResourceId = event.pathParameters.CourseResourceId;
  
    try {
      const params = {
        TableName: RESOURCE_TABLE_NAME,
        Key: {
          CourseId: CourseId,
          CourseResourceId: CourseResourceId
        },
        // UpdateExpression: 'SET ResourceName = :name, ResourceType = :type, ResourceData = :data',
        UpdateExpression: 'SET ResourceData = :data',
        // ExpressionAttributeNames: {},
        ExpressionAttributeValues: {
          // ':name': data.ResourceName,
          // ':type': data.ResourceType,
          ':data': {
            Links: data.Links.map(link => ({
              Link: link.Link,
              Description: link.Description
            }))
          }
        },

        // ConditionExpression: 'attribute_exists(CourseId) AND attribute_exists(CourseResourceId)',
        ReturnValues: 'ALL_NEW'
      };
  
      const updatedResource = await DocumentClient.update(params).promise();
  
      callback(null, call.statement(200, updatedResource.Attributes));
    } catch (err) {
      callback(null, call.statement(500, err.message));
    }
  };
  

  const DeleteResource = async (event, context, callback) => {
    // const data = JSON.parse(event.body);
    const CourseId = event.pathParameters.CourseId;
    const CourseResourceId = event.pathParameters.CourseResourceId;
    try {
        const params = {
            TableName: RESOURCE_TABLE_NAME,
            Key: {
              CourseId: CourseId,
              CourseResourceId: CourseResourceId
            },
            ConditionExpression: 'attribute_exists(CourseResourceId)', // Make sure the item with the given CourseResourceId exists before deleting
        };

        await DocumentClient.delete(params).promise();
        callback(null, call.statement(200, { message: 'Resource deleted successfully' }));
    } catch (err) {
        callback(null, call.statement(500, err.message));
    }
};

  
  // const updateCourseResourceLink = async (event, context, callback) => {
  //   const data = JSON.parse(event.body);
  //   const { CourseId, CourseResourceId, Link, Description } = data;
  
  //   try {
  //     const params = {
  //       TableName: RESOURCE_TABLE_NAME,
  //       Key: {
  //         CourseId: CourseId,
  //         CourseResourceId: CourseResourceId
  //       },
  //       UpdateExpression: 'SET ResourceData.Links.#linkIndex = :linkData',
  //       ExpressionAttributeNames: {
  //         '#linkIndex': Link
  //       },
  //       ExpressionAttributeValues: {
  //         ':linkData': {
  //           Link: Link,
  //           Description: Description
  //         }
  //       },
  //       ConditionExpression: 'attribute_exists(CourseId) AND attribute_exists(CourseResourceId)',
  //       ReturnValues: 'ALL_NEW'
  //     };
  
  //     const updatedData = await DocumentClient.update(params).promise();
  
  //     callback(null, call.statement(200, updatedData.Attributes));
  //   } catch (err) {
  //     callback(null, call.statement(500, err.message));
  //   }
  // };
  




  module.exports = { CreateResource, getAllResourcesofACourse, updateCourseSpecificResource, DeleteResource }

