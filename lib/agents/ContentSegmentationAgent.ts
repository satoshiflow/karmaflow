// lib/agents/ContentSegmentationAgent.ts

/**
 * @file ContentSegmentationAgent.ts
 * @description
 * Diese Agentenklasse unterteilt Eingabetext in sinnvolle Segmente – z. B. nach Absätzen oder Sätzen –
 * und bildet den Einstiegspunkt für die weitere semantische Analyse im KARMA-Multi-Agenten-Framework.
 *
 * @example
 * const agent = new ContentSegmentationAgent(true)
 * const result = agent.segment("Absatz 1.\n\nAbsatz 2.")
 * console.log(result.segments) // Ausgabe: ["Absatz 1.", "Absatz 2."]
 *
 * @author
 * KI-generiert mit menschlicher Nachbearbeitung
 *
 * @version 1.0.0
 * @date 2025-06-08
 *
 * @usage
 * Dieser Agent ist Teil der KARMA-Verarbeitungskette und wird typischerweise als erster Schritt
 * vor der Zusammenfassung, Entitätserkennung und Tripelbildung verwendet.
 */


export class ContentSegmentationAgent {
  constructor(private debug = false) {}

  segment(text: string): { segments: string[] } {
    if (this.debug) {
      console.log('[ContentSegmentationAgent] Eingabetext:', text)
    }

    // Segmentieren nach Absätzen (zwei oder mehr Zeilenumbrüche)
    const segments = text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)

    // Fallback: Satzweise Trennung
    if (segments.length <= 1) {
      return {
        segments: text.match(/[^.!?]+[.!?]+/g) ?? [text]
      }
    }

    return { segments }
  }
}

export default ContentSegmentationAgent