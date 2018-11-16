import stripe from 'stripe'
import { success, failure } from '../helpers/response'
import { calcCost } from '../helpers/billing'

async function main(event, context) {
  const { storage, source } = JSON.parse(event.body)
  const amount = calculateCost(storage)
  const description = 'Scratch charge'

  const Stripe = stripe(process.env.stripeKey)
  
  try {
    await Stripe.charges.create({
      source,
      amount,
      description,
      currency: 'usd'
    })
    return success({ status: true })
  } catch (e) {
    console.log(e)
    return failure({ message: e.message })
  }
}
