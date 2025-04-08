import { getCounter, updateCounter, resetCounter } from '../model/counterModel'

export async function incrementCounter(): Promise<number> {
  const currentValue = await getCounter()
  const newValue = currentValue + 1
  await updateCounter(newValue)
  return newValue
}

export async function decrementCounter(): Promise<number> {
  const currentValue = await getCounter()
  const newValue = currentValue - 1
  await updateCounter(newValue)
  return newValue
}

export async function getCounterValue(): Promise<number> {
  return await getCounter()
}

export async function resetCounterValue(): Promise<number> {
  await resetCounter()
  return 0
}
