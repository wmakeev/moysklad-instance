import test from 'tape'
import { getHelpers, getInstance } from '../src'

test('getInstance', async t => {
  const ms = getInstance()

  t.ok(ms.getVersion())

  const order = await ms.GET('entity/customerorder', {
    limit: 1
  })

  t.ok(order.rows[0].name)
})

test('getHelpers', t => {
  const { href } = getHelpers()

  t.strictEquals(
    href('entity/customerorder'),
    'https://online.moysklad.ru/api/remap/1.2/entity/customerorder'
  )

  t.end()
})
