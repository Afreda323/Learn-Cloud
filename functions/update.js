import * as dynamoDb from '../helpers/dynamo'
import { success, failure } from '../helpers/response'

export async function main(event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null
    },
    ReturnValue: 'ALL_NEW'
  }

  try {
    const updated = await dynamoDb.call('update', params)
    return success({ status: true })
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
