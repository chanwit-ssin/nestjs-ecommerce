import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  private readonly jwt: Jwt;

  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Generate JWT Token
  public generateToken({ id, email }): string {
    return this.jwt.sign({ id, email });
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string) {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}
