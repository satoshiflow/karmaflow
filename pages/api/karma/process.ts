// API-Endpunkt: /api/karma/process
// Zweck: Empfängt Textdaten und gibt das Analyseergebnis der KARMA-Pipeline zurück

import type { NextApiRequest, NextApiResponse } from 'next'
import { runKarmaPipeline } from '../../../lib/core/karmaEngine'

/**
 * Diese Funktion verarbeitet eingehende HTTP-POST-Anfragen.
 * Sie erwartet einen Text im Body, führt darauf die KARMA-Pipeline aus
 * und gibt strukturierte Ergebnisse zurück.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Nur POST-Anfragen sind erlaubt
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed. Bitte verwende POST.'
    })
  }

  // 2. Eingabedaten auslesen
  const { text, metadata } = req.body

  // 3. Validierung: Text muss vorhanden und vom Typ string sein
  if (!text || typeof text !== 'string') {
    return res.status(400).json({
      error: 'Fehlender oder ungültiger Parameter "text".'
    })
  }

  try {
    // 4. KARMA-Analyse starten (zentrale Pipeline)
    const result = await runKarmaPipeline(text, metadata)

    // 5. Erfolgreiche Antwort zurücksenden
    return res.status(200).json(result)
  } catch (error) {
    // 6. Fehlerbehandlung bei Problemen im Prozess
    console.error('[KARMA] Pipeline-Fehler:', error)
    return res.status(500).json({
      error: 'Interner Fehler bei der KARMA-Verarbeitung.'
    })
  }
//       schema: 'http://example.org/schema/Scientist'
//     }))