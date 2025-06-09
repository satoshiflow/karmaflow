// types/karma.d.ts
// Gemeinsame Schnittstellen und Typdefinitionen für das Karma-System

// types/karma.ts
export interface KarmaMetadata {
  userId?: string
  debug?: boolean
  language?: string
}

export interface KarmaResult {
  message: string
  input: string
  metadata?: KarmaMetadata
  steps?: any[] // Optional: Logs / Zwischenergebnisse der Agenten
}
