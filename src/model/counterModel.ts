import { TableClient } from '@azure/data-tables'
import { CounterEntity } from '../types'

const connectionString = process.env['AzureWebJobsStorage']
const tableName = 'CounterTable'
const partitionKey = 'Counter'
const rowKey = 'Current'

const tableClient = TableClient.fromConnectionString(
  connectionString,
  tableName
)

export async function getCounter(): Promise<number> {
  try {
    const entity = await tableClient.getEntity<CounterEntity>(
      partitionKey,
      rowKey
    )
    return entity.value
  } catch (error: any) {
    if (error.statusCode === 404) {
      await tableClient.createEntity<CounterEntity>({
        partitionKey,
        rowKey,
        value: 0,
      })
      return 0
    }
    throw error
  }
}

export async function updateCounter(value: number): Promise<void> {
  const entity: CounterEntity = { partitionKey, rowKey, value }
  await tableClient.upsertEntity(entity, 'Replace')
}

export async function resetCounter(): Promise<void> {
  await updateCounter(0)
}
