import { SetMetadata } from '@nestjs/common';

export const API_MESSAGE_KEY = 'api:message';

export const ApiMessage = (message: string) =>
  SetMetadata(API_MESSAGE_KEY, message);
