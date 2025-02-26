import { spawn, SpawnOptions } from 'child_process'
import t from 'tap'
import { sep } from 'path'
const bin = require.resolve('../dist/cjs/src/bin.js')

interface Result {
  args: string[]
  options: SpawnOptions
  stdout: string
  stderr: string
  code: number | null
  signal: NodeJS.Signals | null
}
const run = async (args: string[], options = {}) => {
  const proc = spawn(
    process.execPath,
    ['--enable-source-maps', bin, ...args],
    options
  )
  const out: Buffer[] = []
  const err: Buffer[] = []
  proc.stdout.on('data', c => out.push(c))
  proc.stderr.on('data', c => err.push(c))
  return new Promise<Result>(res => {
    proc.on('close', (code, signal) => {
      res({
        args,
        options,
        stdout: Buffer.concat(out).toString(),
        stderr: Buffer.concat(err).toString(),
        code,
        signal,
      })
    })
  })
}

t.test('usage', async t => {
  t.matchSnapshot(await run(['-h']), '-h shows usage')
  const res = await run([])
  t.equal(res.code, 1, 'exit with code 1 when no args')
  t.match(res.stderr, 'No patterns provided')
  t.match(res.stderr, /-h --help +Show this usage information$/m)
  const badp = await run(['--platform=glorb'])
  t.equal(badp.code, 1, 'exit with code 1 on bad platform arg')
  t.match(badp.stderr, 'Invalid value provided for --platform: "glorb"\n')
})

t.test('finds matches for a pattern', async t => {
  const cwd = t.testdir({
    a: {
      'x.y': '',
      'x.a': '',
      b: {
        'z.y': '',
        'z.a': '',
      },
    },
  })
  const res = await run(['**/*.y'], { cwd })
  t.match(res.stdout, `a${sep}x.y\n`)
  t.match(res.stdout, `a${sep}b${sep}z.y\n`)

  const c = `node -p "process.argv.map(s=>s.toUpperCase())"`
  const cmd = await run(['**/*.y', '-c', c], { cwd })
  t.match(cmd.stdout, `'a${sep}x.y'`.toUpperCase())
  t.match(cmd.stdout, `'a${sep}b${sep}z.y'`.toUpperCase())
})

t.test('prioritizes exact match if exists, unless --all', async t => {
  const cwd = t.testdir({
    routes: {
      '[id].tsx': '',
      'i.tsx': '',
      'd.tsx': '',
    }
  })
  const res = await run(['routes/[id].tsx'], { cwd })
  t.equal(res.stdout, 'routes/[id].tsx\n')

  const all = await run(['routes/[id].tsx', '--all'], { cwd })
  t.match(all.stdout, 'routes/i.tsx\n')
  t.match(all.stdout, 'routes/d.tsx\n')
})

t.test('uses default pattern if none provided', async t => {
  const cwd = t.testdir({
    a: {
      'x.y': '',
      'x.a': '',
      b: {
        'z.y': '',
        'z.a': '',
      },
    },
  })

  const def = await run(['-p', '**/*.y'], { cwd })
  t.match(def.stdout, `a${sep}x.y\n`)
  t.match(def.stdout, `a${sep}b${sep}z.y\n`)

  const exp = await run(['-p', '**/*.y', '**/*.a'], { cwd })
  t.match(exp.stdout, `a${sep}x.a\n`)
  t.match(exp.stdout, `a${sep}b${sep}z.a\n`)
})
