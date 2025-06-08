// pages/api/karma/export.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { karmaState } from '@/lib/core/karmaState'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' })
  }

  const format = (req.query.format as string) || 'json'
  if (format !== 'json') {
    return res.status(400).json({ error: 'Only json export supported in demo.' })
  }

  res.status(200).json({ graph: karmaState.graph })
}
