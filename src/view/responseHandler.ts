import { HttpResponseInit } from '@azure/functions'

export function createResponse(status: number, data: any): HttpResponseInit {
  return {
    status,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}
