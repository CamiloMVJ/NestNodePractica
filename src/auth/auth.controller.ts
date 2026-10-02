import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    @Post('login')
    async login(@Body() data: LoginDto){
        const token = await this.AuthService.validateUser(data);
        if(!token) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        return token;
    }
}


