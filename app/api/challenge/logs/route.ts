import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type CompletionLog = {
  id: string
  playerName: string
  completedAt: string
  livesLeft: number
}

const logsFilePath = path.join(process.cwd(), 'data', 'challenge-logs.json')

async function readLogs(): Promise<CompletionLog[]> {
  try {
    const raw = await fs.readFile(logsFilePath, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeLogs(logs: CompletionLog[]): Promise<void> {
  const dataDir = path.dirname(logsFilePath)
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(logsFilePath, JSON.stringify(logs, null, 2), 'utf8')
}

export async function GET() {
  const logs = await readLogs()
  logs.sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())

  const earliestLogs = logs.slice(0, 7)
  return NextResponse.json({
    logs: earliestLogs,
    total: logs.length,
    hasMore: logs.length > 7,
  })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CompletionLog>
    const playerName = (body.playerName ?? '').trim()

    if (!playerName) {
      return NextResponse.json({ error: 'playerName is required' }, { status: 400 })
    }

    const livesLeft = Number.isFinite(body.livesLeft) ? Number(body.livesLeft) : 0
    const logs = await readLogs()

    const entry: CompletionLog = {
      id: randomUUID(),
      playerName,
      completedAt: new Date().toISOString(),
      livesLeft,
    }

    const nextLogs = [entry, ...logs].slice(0, 500)
    await writeLogs(nextLogs)

    return NextResponse.json({ entry }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }
}
