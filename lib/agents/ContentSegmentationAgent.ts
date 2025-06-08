// Axolotl – Empowered by satoshiflow
// ContentSegmentationAgent – Splits a text into meaningful segments

import { Logger } from '../utils/logger'
import { AgentError } from '../utils/errorTypes'

export interface SegmentationResult {
  segments: string[]
}

export class ContentSegmentationAgent {
  private logger: Logger

  constructor(debug = false) {
    this.logger = new Logger({ level: 'INFO', debug })
  }

  public segment(text: string): SegmentationResult {
    if (!text) throw new AgentError('No text provided')

    let segments = text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)

    if (segments.length === 1) {
      segments = text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean)
    }

    this.logger.debugLog(`[ContentSegmentationAgent] Segments: ${segments.length}`)

    return { segments }
  }
}
