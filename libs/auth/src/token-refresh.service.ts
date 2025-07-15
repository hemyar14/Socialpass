// libs/auth/src/token-refresh.service.ts
export class TokenRefreshService {
  @Cron('0 3 * * *') // Daily at 3AM
  async refreshTokens() {
    const expiringSoon = await this.tokenRepo.findExpiring(72); // 72 hours
    for (const token of expiringSoon) {
      try {
        const newTokens = await this.platformService.refreshToken(
          token.platform, 
          token.refreshToken
        );
        
        await this.tokenRepo.updateToken(token.id, {
          accessToken: newTokens.access_token,
          refreshToken: newTokens.refresh_token || token.refreshToken,
          expiresAt: Date.now() + (newTokens.expires_in * 1000)
        });
      } catch (error) {
        this.monitor.tokenRefreshFailed(token, error);
      }
    }
  }
}