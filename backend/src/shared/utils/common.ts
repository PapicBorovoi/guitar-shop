import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export const getMongoConnectionUri = ({
  host,
  port,
  dbName,
  username,
  password,
  authSource,
}: {
  host: string;
  port: number;
  dbName: string;
  username: string;
  password: string;
  authSource: string;
}) =>
  `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authSource}`;
