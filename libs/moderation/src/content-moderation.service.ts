// libs/moderation/src/content-moderation.service.ts
import { Injectable } from '@nestjs/common';
import { PerspectiveAPI } from '@google-cloud/perspective';

@Injectable()
export class ContentModeration {
  private perspective = new PerspectiveAPI();

  async checkContent(content: string): Promise<ModerationResult> {
    const [result] = await this.perspective.analyzeText({
      text: content,
      requestedAttributes: {
        TOXICITY: {}, 
        INSULT: {}, 
        SEXUALLY_EXPLICIT: {}
      }
    });

    return {
      isApproved: result.attributeScores.TOXICITY.summaryScore.value < 0.7,
      scores: {
        toxicity: result.attributeScores.TOXICITY.summaryScore.value,
        explicit: result.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value
      },
      flags: Object.entries(result.attributeScores)
        .filter(([_, score]) => score.summaryScore.value > 0.7)
        .map(([key]) => key)
    };
  }
}