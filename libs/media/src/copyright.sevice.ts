// libs/media/src/copyright.service.ts
async verifyOriginality(image: Buffer): Promise<OriginalityReport> {
  const reverseImage = await this.reverseImageSearch(image);
  const aiArtifactDetection = await this.detectAIArtifacts(image);
  return {
    isLikelyOriginal: reverseImage.matches.length === 0,
    aiProbability: aiArtifactDetection.aiScore,
    similarityMatches: reverseImage.matches
  };
}