// libs/ai-core/src/trend-integration.service.ts
export class TrendIntegrationService {
  async injectTrends(content: string, trends: TrendData[]): Promise<string> {
    const relevantTrends = this.filterRelevantTrends(content, trends);
    if (relevantTrends.length === 0) return content;
    
    const prompt = `Integrate these current trends naturally into the content:\n
    Original Content: "${content}"\n
    Trends to Integrate:\n${relevantTrends.map(t => `- ${t.name} (${t.volume} mentions)`}\n\n
    Maintain the original intent while adding timely relevance.`;
    
    return this.aiService.generate(prompt);
  }

  private filterRelevantTrends(content: string, trends: TrendData[]): TrendData[] {
    const contentEmbedding = this.embeddingService.embed(content);
    return trends.filter(trend => 
      this.similarityService.cosineSimilarity(contentEmbedding, trend.embedding) > 0.7
    );
  }
}