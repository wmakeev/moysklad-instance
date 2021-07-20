import 'isomorphic-fetch'

import Moysklad from 'moysklad'
import once from 'lodash.once'
import { wrapFetchApi } from 'moysklad-fetch-planner'
import type { TypedInstance } from './TypedInstance'

export * from './TypedInstance'

// {
//   eventHandler: {
//     emit: (eventName, data) => {
//       console.log(eventName, JSON.stringify(data))
//     }
//   }
// }

export const getInstance = once(() => {
  const ms: TypedInstance = Moysklad({
    apiVersion: '1.2',
    // TODO Согласовать интерфейсы DOM и node-fetch
    // TODO window.fetch по умолчанию если не указан явно
    // @ts-ignore
    fetch: wrapFetchApi(fetch)
  })

  return ms
})
