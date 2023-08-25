import { Route } from './route.model'

export const findRouteCode = async (): Promise<string | undefined> => {
  const lastRoute = await Route.findOne({}, { route_code: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean() // operation make faster
  return lastRoute?.route_code ? lastRoute?.route_code?.substring(2) : undefined
}

export const generatedRouteCode = async (): Promise<string> => {
  const currentId = (await findRouteCode()) || (0).toString().padStart(5, '0') // 00000
  // increment by one
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `R-${incrementedId}` //R-00001
  return incrementedId
}
