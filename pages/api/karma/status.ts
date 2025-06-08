// pages/api/karma/status.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { karmaState } from '@/lib/core/karmaState'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' })
  }

  res.status(200).json({
    lastResult: karmaState.lastResult,
    logs: karmaState.logs,
    lastError: karmaState.lastError
  })
}
