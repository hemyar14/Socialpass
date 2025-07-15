export class ComplianceService {
  constructor(private nerService: any) {}

  async anonymizeContent(content: string): Promise<string> {
    const entities = await this.nerService.detectPII(content);

    return entities.reduce((anonymized: string, entity: { text: string }) => {
      return anonymized.replace(entity.text, '[REDACTED]');
    }, content);
  }
}