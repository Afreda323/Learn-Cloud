import uuid from 'uuid'
import * as dynamoDbLib from '../helpers/dynamo'
import { success, failure } from '../helpers/response'

export async function main(event, context) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  }

  try {
    await dynamoDbLib.call('put', params)
    return success(params.Item)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
