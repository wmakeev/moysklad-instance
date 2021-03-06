import type {
  Account,
  Collection,
  CounterpartyReportItem,
  CustomerOrder,
  EntityRef,
  Expand,
  Patch
} from 'moysklad-api-model'
import type { TypedInstance } from '../src'

const ms = {} as TypedInstance

async function testCases() {
  // GET
  const t1_1 = await ms.GET('entity/customerorder')
  t1_1.rows[0].meta.type
  const t1_1_2: Collection<CustomerOrder> = t1_1
  t1_1_2

  const t1_2 = await ms.GET('entity/customerorder', {
    filter: {
      name: 'foo'
    }
  })
  t1_2.rows

  const t1_3: Collection<CustomerOrder> = await ms.GET(
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
  t1_3.rows

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
  // @ts-expect-error - state not expanded
  t1_5.rows[0].state.name

  const t6_1 = (
    await ms.GET('entity/customerorder', {
      expand: 'state'
    })
  ).rows

  function selectRef(
    doc: Expand<CustomerOrder, 'state'>
  ): EntityRef<'customerorder'> {
    return {
      meta: doc.meta
    }
  }

  const t6_2: EntityRef<'customerorder'> = selectRef(t6_1[0])
  t6_2.meta

  const t6_3 = t6_1.map(it => {
    return selectRef(it)
  })
  t6_3[0].meta

  for (const it of t6_1) {
    t6_1.push(it)
  }

  const t1_7: Account[] = await ms
    .GET('entity/organization/123-456/accounts')
    .then(res => res.rows)

  t1_7[0].accountNumber

  // Nullable patch fields
  const t1_8 = await ms.PUT('entity/customerorder/123-456', {
    contract: null
  })
  t1_8.contract

  // PUT

  const t2_1 = await ms.PUT('entity/customerorder/123-456', {
    description: 'foo'
  })
  t2_1.agent

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
  t3_1[0].demands

  const t3_2 = await ms.POST('entity/customerorder', {
    description: 'foo'
  })

  t3_2.deliveryPlannedMoment

  const t3_3 = {} as Patch<'invoiceout'>

  const t3_4 = await ms.POST('entity/invoiceout', t3_3)
  t3_4.paymentPlannedMoment

  const t3_5: CounterpartyReportItem = await ms
    .POST('report/counterparty', {
      counterparties: [
        {
          counterparty: {
            meta: {
              type: 'counterparty',
              href: 'entity/counterparty/123-456'
            }
          }
        }
      ]
    })
    .then(res => res.rows[0])
  t3_5.balance

  // Сохранение шаблона
  const t3_6 = await ms.PUT('entity/salesreturn/new', {
    demand: {
      meta: {
        type: 'demand',
        href: ''
      }
    }
  })

  const t3_7 = await ms.POST('entity/salesreturn', t3_6)
  t3_7.name

  // DELETE

  await ms.DELETE('entity/customerorder/123-456')

  const t5_1: string = ms.buildUrl('foo')
  t5_1
}
testCases
