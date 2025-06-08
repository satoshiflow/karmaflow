// pages/api/karma/process.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { runKarmaPipeline } from '@/lib/core/karmaEngine'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  const { text, metadata } = req.body

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid `text` in request body.' })
  }

  try {
    const result = await runKarmaPipeline(text, metadata)
    res.status(200).json({ success: true, result })
  } catch (err) {
    console.error('[KARMA PROCESS ERROR]', err)
    res.status(500).json({ error: 'Internal processing error', details: String(err) })
  }
}
