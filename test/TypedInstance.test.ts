import type {
  Account,
  Collection,
  CounterpartyReportItem,
  Patch
} from 'moysklad-api-model'
import type { TypedInstance } from '../src'

const ms = {} as TypedInstance

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

  const t1_6: Account[] = await ms
    .GET('entity/organization/123-456/accounts')
    .then(res => res.rows)
  t1_6

  // PUT

  const t2_1 = await ms.PUT('entity/customerorder/123-456', {
    description: 'foo'
  })
  t2_1

  const t2_2 = await ms.PUT('entity/customerorder/new', {
    foo: 'bar'
  })
  t2_2.positions.rows[0].quantity

  // POST

  const t3_1 = await ms.POST('entity/customerorder', [
    {
      description: 'foo'
    }
  ])
  t3_1

  const t3_2 = await ms.POST('entity/customerorder', {
    description: 'foo'
  })
  t3_2

  const t3_3 = {} as Patch<'invoiceout'>

  const t3_4 = await ms.POST('entity/invoiceout', t3_3)
  t3_4

  const t3_5: CounterpartyReportItem = await ms
    .POST('report/counterparty', {
      counterparties: [
        {
          counterparty: {
            meta: {
              type: 'counterparty',
              href: `entity/counterparty/123-456`
            }
          }
        }
      ]
    })
    .then(res => res.rows[0])
  t3_5

  // DELETE

  await ms.DELETE('entity/customerorder/123-456')

  const t5_1: string = ms.buildUrl('foo')
  t5_1
}

testCases
