/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

export const insertIntoDB = async (payload: User) => {
  const isExist = await prisma.user.findFirst({
    where: {
      username: payload.username,
    },
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exist this username');
  }
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bycrypt_salt_rounds));
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
  if (!result) {
    throw new ApiError(404, 'Something Went wrong');
  }

 

  return result;
};



const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { username, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error('Incorrect password');
  }

  //create access token & refresh token

  const accessToken = jwtHelpers.createToken(
    { username: user.username, role: user.role, id: user.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { username: user.username, role: user.role, id: user.id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { username } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await prisma.user.findFirst({
    where: {
      username,
    },
  })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      username: isUserExist.username,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};




export const AuthService = {
  insertIntoDB,
  loginUser,
  refreshToken
};
