import type { Register, SessionContextUsage, SessionRateLimit } from 'claude-code'

const WIDTH = 10

function bar(percent: number | undefined): string {
  if (percent === undefined) return `${'·'.repeat(WIDTH)}  –`
  const clamped = Math.max(0, Math.min(100, percent))
  const filled = Math.round((clamped / 100) * WIDTH)
  return `${'█'.repeat(filled)}${'░'.repeat(WIDTH - filled)} ${Math.round(percent)}%`
}

function resetIn(resetsAt: string | undefined, now: number): string {
  if (!resetsAt) return ''
  const ms = Date.parse(resetsAt) - now
  if (!(ms > 0)) return ''
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  if (h >= 24) return ` (${Math.floor(h / 24)}d${h % 24}h)`
  return h > 0 ? ` (${h}h${String(m).padStart(2, '0')})` : ` (${m}m)`
}

function line(context: SessionContextUsage, limits: SessionRateLimit[], now: number): string {
  const five = limits.find(l => l.kind === 'five_hour')
  const week = limits.find(l => l.kind === 'seven_day')
  return [
    `Ctx ${bar(context.percent)}`,
    `5h ${bar(five?.percentUsed)}${resetIn(five?.resetsAt, now)}`,
    `Woche ${bar(week?.percentUsed)}${resetIn(week?.resetsAt, now)}`,
  ].join('  │  ')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    const u = await $.session.usage()
    $.ui.status(line(u.context, u.rateLimits, $.clock.now()))
    return result
  })

  on('session.measure', ($, e, next) => {
    $.ui.status(line(e.context, e.rateLimits, $.clock.now()))
    return next(e)
  })
}
