// Axolotl – Empowered by satoshiflow
// Simple logger utility with log levels

export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'

interface LoggerOptions {
  level?: LogLevel
  debug?: boolean
}

export class Logger {
  private level: LogLevel
  private debug: boolean

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'INFO'
    this.debug = options.debug || false
  }

  private shouldLog(target: LogLevel): boolean {
    const levels: LogLevel[] = ['ERROR', 'WARN', 'INFO', 'DEBUG']
    return levels.indexOf(target) <= levels.indexOf(this.level)
  }

  error(message: string) {
    if (this.shouldLog('ERROR')) console.error('[ERROR]', message)
  }

  warn(message: string) {
    if (this.shouldLog('WARN')) console.warn('[WARN]', message)
  }

  info(message: string) {
    if (this.shouldLog('INFO')) console.info('[INFO]', message)
  }

  debugLog(message: string) {
    if (this.debug && this.shouldLog('DEBUG')) console.debug('[DEBUG]', message)
  }
}
