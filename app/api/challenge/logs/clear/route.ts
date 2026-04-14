import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LOG_FILE = path.join(process.cwd(), 'data', 'challenge-logs.json')

export async function POST() {
  try {
    fs.writeFileSync(LOG_FILE, '[]', 'utf-8')
    return NextResponse.json({ success: true, message: 'Logs cleared' })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
