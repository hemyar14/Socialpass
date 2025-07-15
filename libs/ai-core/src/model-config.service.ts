// libs/ai-core/src/model-config.service.ts
export class ModelConfigService {
  private modelRegistry = new Map<string, AIModelConfig>();

  registerModel(modelId: string, config: AIModelConfig) {
    this.modelRegistry.set(modelId, config);
  }

  getOptimalModel(task: AITaskType): string {
    const taskModels = Array.from(this.modelRegistry.values())
      .filter(config => config.capabilities.includes(task))
      .sort((a, b) => b.performanceScore - a.performanceScore);
    
    return taskModels[0]?.id || 'gpt-4-turbo';
  }

  async generateWithOptimalModel(prompt: string, task: AITaskType): Promise<string> {
    const modelId = this.getOptimalModel(task);
    return this.modelService.generate(prompt, modelId);
  }
}