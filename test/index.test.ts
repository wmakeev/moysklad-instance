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

test('getInstance (keys)', t => {
  const ms1 = getInstance()
  const ms2 = getInstance('default')
  const ms3 = getInstance('foo', { userAgent: 'bar' })
  const ms3_2 = getInstance('foo', { userAgent: 'baz' })

  t.strictEqual(ms1, ms2, 'should return same instance')
  t.strictEqual(ms3, ms3_2, 'should return same instance')
  t.notStrictEqual(ms1, ms3, 'should return other instance')

  t.notStrictEqual(ms1.getOptions().userAgent, 'bar')
  t.strictEqual(ms3.getOptions().userAgent, 'bar')
  t.strictEqual(ms3_2.getOptions().userAgent, 'bar')

  t.end()
})
