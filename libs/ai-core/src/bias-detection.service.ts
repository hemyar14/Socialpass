// libs/ai-core/src/bias-detection.service.ts
export class BiasDetectionService {
  async detectBias(content: string): Promise<BiasReport> {
    const prompt = `Analyze this content for potential biases. Consider:\n
    1. Gender representation\n
    2. Racial/cultural stereotypes\n
    3. Socioeconomic assumptions\n
    4. Age-related biases\n
    5. Political leanings\n\n
    Content: "${content}"\n\n
    Return structured analysis with specific examples and mitigation suggestions.`;
    
    return this.aiService.generateStructured(prompt, BiasReportSchema);
  }

  async mitigateBias(content: string, report: BiasReport): Promise<string> {
    const prompt = `Rewrite this content to address the identified biases:\n
    Original Content: "${content}"\n
    Bias Report: ${JSON.stringify(report)}\n\n
    Maintain the core message while ensuring balanced representation.`;
    
    return this.aiService.generate(prompt);
  }
}