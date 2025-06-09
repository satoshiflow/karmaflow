// lib/agents/ContentSegmentationAgent.ts

import { Logger } from '../utils/logger'
import type { KarmaMetadata } from '../../types/karma'

export interface ContentSegment {
  id: number
  text: string
  start: number
  end: number
}

export class ContentSegmentationAgent {
  private logger: Logger

  constructor(debug = false) {
    this.logger = new Logger({ level: 'INFO', debug })
  }

  /**
   * Zerteilt den eingegebenen Text kontextsensitiv in Segmente.
   * Aktuell: einfache Absatz-basierte Aufteilung mit Positionsmarkierung.
   */
  public process(input: string, metadata?: KarmaMetadata): ContentSegment[] {
    this.logger.debugLog('[ContentSegmentationAgent] Segmentierung beginnt')

    const segments: ContentSegment[] = []
    const paragraphs = input.split(/\n{2,}/)
    let position = 0

    paragraphs.forEach((text, index) => {
      const start = position
      const end = position + text.length
      segments.push({ id: index + 1, text: text.trim(), start, end })
      position = end + 2 // für die nächste Absatzlänge + 2 für doppeltes \n
      this.logger.debugLog(`→ Segment ${index + 1}: ${text.slice(0, 30)}...`)  
    })

    return segments
  }
}

export default ContentSegmentationAgent 