import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService({
  secret: 'testsecret',
  signOptions: { expiresIn: '15m' },
});

const mockUser = {
  email: 'test@example.com',
  password: 'hashedpass',
  roles: ['admin'],
};

const authService = new AuthService(jwtService);

describe('AuthService', () => {
  it('should generate tokens', async () => {
    const token = await authService.login(mockUser);
    expect(token).toHaveProperty('access_token');
    expect(token).toHaveProperty('refresh_token');
  });
});