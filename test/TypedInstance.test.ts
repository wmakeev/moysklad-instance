import Moysklad from 'moysklad'
import type { Collection } from 'moysklad-api-model'
import type { TypedInstance } from '../src'

const ms: TypedInstance = Moysklad()

async function testCases() {
  // GET
  const t1_1: Collection<'customerorder'> = await ms.GET('entity/customerorder')
  t1_1

  const t1_2: Collection<'customerorder'> = await ms.GET(
    'entity/customerorder',
    {
      filter: {
        name: 'foo'
      }
    }
  )
  t1_2

  const t1_3: Collection<'customerorder'> = await ms.GET(
    'entity/customerorder',
    {
      filter: {
        name: 'foo'
      },
      limit: 100
    },
    // FIXME Необходимо типизировать rawResponse
    { rawResponse: true }
  )
  t1_3

  const t1_4 = await ms.GET('entity/customerorder/123-456', {
    filter: {
      name: 'foo'
    },
    expand: 'agent'
  })
  t1_4.agent.name

  const t1_5 = await ms.GET('entity/customerorder', {
    filter: {
      name: 'foo'
    },
    expand: 'agent'
  })
  t1_5.rows[0].agent.name // Expanded
  // @ts-expect-error
  t1_5.rows[0].state.name

  // PUT

  const t2_1 = await ms.PUT('entity/customerorder/123-456', {
    description: 'foo'
  })
  t2_1

  // POST

  const t3_1 = await ms.POST('entity/customerorder', [
    {
      description: 'foo'
    }
  ])
  t3_1

  const t3_2 = await ms.POST('entity/customerorder', {
    // TODO moysklad-api-model: обновить POST
    // @ts-expect-error
    description: 'foo'
  })
  t3_2

  // DELETE

  await ms.DELETE('entity/customerorder/123-456')

  const t5_1: string = ms.buildUrl('foo')
  t5_1
}

testCases
