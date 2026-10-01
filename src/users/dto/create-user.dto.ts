import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'usuario@empresa.com' })
  email!: string;

  @ApiPropertyOptional({ example: 'Usuario de prueba' })
  name?: string;

  @ApiPropertyOptional({ example: '88888888' })
  telephone?: string;

  @ApiProperty({ example: 'password123' })
  password!: string;

  @ApiProperty({ example: 1, description: 'ID del tenant' })
  tenantId!: number;
}