import { PrismaClient } from '@prisma/client';
import { Item } from '../types/catalog.interface';
import { randomInt } from 'crypto';
import { GuitarType, StringNumber } from '../types/guitar.enum';

const description = [
  'Fender Stratocasterfsdfdsfsdfsdf',
  'Gibson Les Paulsfsdfdsfdsfdsfsdf',
  'Gibson SGfsdfsdfsdfsdfsdfsdfsdf',
  'Fender Telecasterfsdfsdfsdfs',
  'Fender Jazzmasterfdsfdsfdsfds',
  'Gretsch White Falconfsfsdfsdfsdfds',
  'Gretsch Duo Jetfsdfsdfsdfsfsdfsdf',
  'Gretsch G5420Tfsdfsdfdsfdsfdsfdsfsf',
  'Gretsch G2622fdsfsdsdfdsfsdfdsfsdf',
];

const name = [
  'Fenderffsfsdfsd',
  'Gibsonfsdfsdfsdf',
  'Gretschfsdfsdfsdf',
  'Ibanezfsdfsdfsdf',
  'Ibanezfsdfsdfsdffdsfsd',
  'Yamahafdsfdsfsdfsdf',
  'Epiphonefsdfsdfdsf',
  'Squierfsdfsdfsdfs',
  'Jacksonfsdfsdfsdf',
];

const numberOfStrings = [4, 6, 7, 12];

const getItem = (): Item => ({
  description: description[randomInt(0, description.length - 1)],
  name: name[randomInt(0, name.length - 1)],
  price: randomInt(100, 1000000),
  type: Object.values(GuitarType)[
    randomInt(0, Object.values(GuitarType).length - 1)
  ],
  numberOfStrings: numberOfStrings[
    randomInt(0, numberOfStrings.length - 1)
  ] as StringNumber,
  imageUrl: '',
  vendorCode: randomInt(100000, 999999).toString(),
});

export const seedDb = async (
  prismaClient: PrismaClient,
  n: number,
  authorId: string,
) => {
  for (let i = 0; i < n; i++) {
    await prismaClient.guitar.create({ data: { ...getItem(), authorId } });
  }
};
