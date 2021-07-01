import 'isomorphic-fetch'

import Moysklad from 'moysklad'
import once from 'lodash.once'
import * as helpers from 'moysklad-helpers'
import { wrapFetchApi } from 'moysklad-fetch-planner'

// {
//   eventHandler: {
//     emit: (eventName, data) => {
//       console.log(eventName, JSON.stringify(data))
//     }
//   }
// }

export const getInstance = once(() => {
  const ms = Moysklad({
    apiVersion: '1.2',
    // TODO Согласовать интерфейсы DOM и node-fetch
    // TODO window.fetch по умолчанию если не указан явно
    // @ts-ignore
    fetch: wrapFetchApi(fetch)
  })

  return ms
})

export const getHelpers = once(() => {
  return helpers.getHelpers(getInstance())
})
