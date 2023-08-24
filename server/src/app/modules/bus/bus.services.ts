/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBus, IBusResponse } from './bus.interface'
import { generatedBusCode } from './bus.utils'
import { Bus } from './bus.model'

const createBus = async (payload: IBus): Promise<IBusResponse> => {
  const bus_code = await generatedBusCode() // generated bus code
  payload.bus_code = bus_code
  const newRoute = await Bus.create(payload)
  return newRoute
}

export const BusService = {
  createBus,
}
