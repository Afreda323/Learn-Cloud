import * as dynamoDbLib from '../helpers/dynamo'
import { success, failure } from '../helpers/response'

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  }

  try {
    const { Items } = await dynamoDbLib.call('query', params)
    return success(Items)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
