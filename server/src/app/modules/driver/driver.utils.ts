import { Driver } from './driver.model'

export const findDriverCode = async (): Promise<string | undefined> => {
  const lastRoute = await Driver.findOne({}, { driver_code: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean() // operation make faster
  return lastRoute?.driver_code
    ? lastRoute?.driver_code?.substring(2)
    : undefined
}

export const generatedDriverCode = async (): Promise<string> => {
  const currentId = (await findDriverCode()) || (0).toString().padStart(4, '0') // 00000
  // increment by one
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0')
  incrementedId = `D-${incrementedId}` //D-0001
  return incrementedId
}
