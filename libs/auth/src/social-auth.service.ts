// libs/auth/src/social-auth.service.ts
import { Injectable } from '@nestjs/common';
import { OAuth2Factory } from './oauth2-factory';

@Injectable()
export class SocialAuthService {
  private strategies = new Map<string, any>();

  async registerPlatform(userId: string, platform: string) {
    const strategy = OAuth2Factory.create(platform);
    const url = strategy.generateAuthUrl({
      state: this.encryptState({ userId, platform }),
      scope: this.getPlatformScopes(platform)
    });
    return { redirectUrl: url };
  }

  async handleCallback(platform: string, code: string, state: string) {
    const { userId } = this.decryptState(state);
    const strategy = OAuth2Factory.create(platform);
    const tokens = await strategy.getToken(code);
    
    await this.tokenService.storeTokens(userId, platform, {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + (tokens.expires_in * 1000)
    });
    
    return { success: true };
  }

  private getPlatformScopes(platform: string): string[] {
    const scopes = {
      tiktok: ['video.upload', 'user.info.basic'],
      instagram: ['instagram_content_publish', 'pages_read_engagement'],
      facebook: ['pages_manage_posts', 'pages_read_engagement']
    };
    return scopes[platform] || [];
  }
}