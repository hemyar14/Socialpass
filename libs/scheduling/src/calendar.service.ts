// libs/scheduling/src/calendar.service.ts
export class CalendarService {
  async checkConflicts(schedule: ScheduleRequest): Promise<Conflict[]> {
    const conflicts = [];
    
    // 1. Time slot availability
    const existing = await this.getScheduledContent(schedule.teamId, schedule.date);
    if (existing.length >= MAX_POSTS_PER_DAY) {
      conflicts.push({ type: 'DAILY_LIMIT', max: MAX_POSTS_PER_DAY });
    }
    
    // 2. Platform constraints
    for (const platform of schedule.platforms) {
      const platformRules = PLATFORM_RULES[platform];
      if (schedule.content.media?.length > platformRules.maxMedia) {
        conflicts.push({ 
          type: 'MEDIA_LIMIT', 
          platform, 
          max: platformRules.maxMedia 
        });
      }
    }
    
    // 3. Resource availability
    if (schedule.requiresApproval && !this.hasAvailableApprovers(schedule.teamId)) {
      conflicts.push({ type: 'MISSING_APPROVER' });
    }
    
    return conflicts;
  }
}