// libs/ai-core/src/optimization.service.ts
export class ContentOptimizer {
  async optimizeForEngagement(content: string, platform: string): Promise<OptimizedContent> {
    const analysis = await this.analyzeContent(content);
    const suggestions = await this.generateOptimizationSuggestions(analysis, platform);
    
    return {
      original: content,
      optimized: await this.applyOptimizations(content, suggestions),
      scoreDelta: suggestions.estimatedImprovement,
      suggestions: suggestions.items
    };
  }

  private async generateOptimizationSuggestions(analysis: ContentAnalysis, platform: string) {
    const prompt = `Provide optimization suggestions for social media content targeting ${platform}:\n
    Content Analysis:
    - Sentiment: ${analysis.sentiment.score} (${analysis.sentiment.label})
    - Readability: ${analysis.readability.score}/100
    - Keyword Density: ${analysis.keywords.top.join(', ')}
    - Engagement Potential: ${analysis.engagement.score}/10
    
    Provide specific, actionable suggestions to improve engagement and virality potential. 
    Estimate the percentage improvement for each suggestion.`;
    
    return this.aiService.generateStructured(prompt, OptimizationSuggestionsSchema);
  }
}