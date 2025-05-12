import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto } from "./DTOs/sign-in.dto";
import { SignUpDto } from "./DTOs/sign-up.dto";


@Controller('auth')
export class AuthController{
    constructor(
        private authService: AuthService
    ){}

    @Post('signin')
    signin(@Body() body: SigninDto){
        return this.authService.signin(body)
    }

    @Post('signup')
    signup(@Body() body: SignUpDto){
       return this.authService.createUser(body)
    }
}