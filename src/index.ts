import 'isomorphic-fetch'

import Moysklad from 'moysklad'
import memoize from 'lodash.memoize'
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

/**
 * Создает и кеширует инстанс библиотеки `moysklad`
 *
 * @param instance Ключ инстанса (если не указан то `default`)
 * @param options Опциональные параметры (применяются только при первом вызове)
 * @returns Инстанс Moysklad
 */
export const getInstance = memoize(
  (instance?: string, options?: Moysklad.Options) => {
    const ms: TypedInstance = Moysklad({
      apiVersion: '1.2',
      // TODO Согласовать интерфейсы DOM и node-fetch
      // TODO window.fetch по умолчанию если не указан явно
      fetch: wrapFetchApi(fetch),

      ...(options ? options : {})
    }) as any

    instance

    return ms
  },
  (instance?: string) => instance ?? 'default'
)
