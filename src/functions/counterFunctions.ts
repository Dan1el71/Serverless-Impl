import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'
import {
  incrementCounter,
  decrementCounter,
  getCounterValue,
  resetCounterValue,
} from '../controller/counterController'
import { createResponse } from '../view/responseHandler'

app.http('incrementCounter', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'counter/increment',
  handler: async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    const newValue = await incrementCounter()
    return createResponse(200, { counter: newValue })
  },
})

app.http('decrementCounter', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'counter/decrement',
  handler: async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    const newValue = await decrementCounter()
    return createResponse(200, { counter: newValue })
  },
})

app.http('getCounter', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'counter/get',
  handler: async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    const currentValue = await getCounterValue()
    return createResponse(200, { counter: currentValue })
  },
})

app.http('resetCounter', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'counter/reset',
  handler: async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    const newValue = await resetCounterValue()
    return createResponse(200, { counter: newValue })
  },
})
