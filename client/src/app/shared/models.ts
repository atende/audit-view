export type SecurityLevel  = "LOW" | "NORMAL" | "HIGHT"
export interface AuditEvent {
  id: number,
  applicationName: string,
  userName: string,
  action: string,
  resource: {
    resourceType: string,
    resourceIds: string[]
  }
  dateTime: Date,
  ip: string,
  securityLevel: SecurityLevel,
  description: string
}
