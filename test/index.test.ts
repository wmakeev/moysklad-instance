import test from 'tape'
import { getInstance } from '../src'

test('getInstance', async t => {
  const ms = getInstance()

  t.ok(ms.getVersion())

  const order = await ms.GET('entity/customerorder', {
    limit: 1
  })

  t.ok(order.rows[0].name)
})
