// libs/collaboration/src/permission.service.ts
export class PermissionService {
  private policies = {
    'content:edit': (user, content) => 
      user.roles.includes('editor') || 
      content.authorId === user.id,
      
    'schedule:publish': (user) => 
      user.roles.includes('publisher'),
      
    'analytics:view': (user, report) => 
      user.teams.includes(report.teamId)
  };

  checkPermission(user: User, action: string, resource?: any): boolean {
    const policy = this.policies[action];
    if (!policy) return false;
    
    return policy(user, resource);
  }
}

// Usage in controller
@Post('content/:id')
@UseGuards(PermissionGuard('content:edit'))
async updateContent(@Param('id') id: string) {
  // Update logic
}