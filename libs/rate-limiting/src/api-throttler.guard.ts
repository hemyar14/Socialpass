// libs/rate-limiting/src/api-throttler.guard.ts
import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class ApiThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): string {
    return req.user?.id || req.ip; // User-based or IP-based tracking
  }

  protected async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number
  ): Promise<boolean> {
    const { req, res } = this.getArgs(context);
    
    // Skip rate limiting for premium users
    if (req.user?.plan === 'premium') return true;

    const key = this.generateKey(context, this.getTracker(req));
    const { totalHits } = await this.storageService.increment(key, ttl);
    
    res.header(`${this.headerPrefix}-Limit`, `${limit}`);
    res.header(`${this.headerPrefix}-Remaining`, `${Math.max(0, limit - totalHits)}`);
    
    return totalHits <= limit;
  }
}