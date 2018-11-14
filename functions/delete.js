import * as dynamoDbLib from '../helpers/dynamo'
import { success, failure } from '../helpers/response'

export async function main(event, context, callback) {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }
  try {
    const deleted = await dynamoDbLib.call('delete', params)
    return success({ status: true })
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
