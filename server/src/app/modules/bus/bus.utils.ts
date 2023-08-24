import { Bus } from './bus.model'

export const findBusCode = async (): Promise<string | undefined> => {
  const lastRoute = await Bus.findOne({}, { bus_code: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean() // operation make faster
  return lastRoute?.bus_code ? lastRoute?.bus_code?.substring(2) : undefined
}

export const generatedBusCode = async (): Promise<string> => {
  const currentId = (await findBusCode()) || (0).toString().padStart(4, '0') // 00000
  // increment by one
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0')
  incrementedId = `B-${incrementedId}` //B-0001
  return incrementedId
}
