import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import config from 'src/app/config';
import { AuthController } from 'src/app/controllers/auth/AuthController';
import { JwtStrategy } from 'src/app/middlewares/auth/jwt.strategy';
import { AuthFacade } from 'src/context/auth/application/AuthFacade';
import { PasswordHasher } from 'src/context/auth/application/class/PasswordHasher';
import { UserLogin } from 'src/context/auth/application/UserLogin';
import { UserRegister } from 'src/context/auth/application/UserRegister';
import { MongoUserRepository } from 'src/context/auth/infrastructure/repository/MongoUserRepository';
import { MongoUserSchema } from 'src/context/auth/infrastructure/schemas/MongoUserSchema';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'user', schema: MongoUserSchema }]),
    JwtModule.register({
      secret: config.TOKEN_JWT.ACCESS_TOKEN,
      signOptions: { expiresIn: config.TOKEN_JWT.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    PasswordHasher,
    { provide: 'UserPersistRepository', useClass: MongoUserRepository },
    UserRegister,
    UserLogin,
    AuthFacade,
  ],
  exports: [AuthFacade],
})
export class AuthModule {}
