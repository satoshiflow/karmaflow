// pages/api/karma/monitor.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { karmaState } from '@/lib/core/karmaState'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' })
  }

  res.status(200).json({
    agents: { running: true },
    errors: karmaState.lastError,
    debug: karmaState.logs
  })
}
