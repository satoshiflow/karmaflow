// types/karma.d.ts
// Gemeinsame Schnittstellen und Typdefinitionen für das Karma-System

export interface KarmaMetadata {
  [key: string]: any
}

export interface KarmaResult {
  message: string
  input: string
  metadata?: KarmaMetadata
}
