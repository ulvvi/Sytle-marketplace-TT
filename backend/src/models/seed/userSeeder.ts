import { prisma } from "../../config/prisma";
import { fakerPT_BR as faker } from '@faker-js/faker';


enum Gender{
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export async function seedUsers(amount: number = 10) {
  console.log(`Gerando ${amount} usuários...`);

  const users = Array.from({ length: amount }).map(() => {
    const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
    const firstName = faker.person.firstName(gender === Gender.MALE ? 'male' : 'female');
    const lastName = faker.person.lastName();

    return {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      hash: faker.internet.password(),
      salt: faker.string.alphanumeric(16),
      gender,
      phoneNumber: faker.phone.number({ style: 'international' }),
      dateBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      
      totalOrders: faker.number.int({ min: 0, max: 20 }),
      totalRating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      totalWishlist: faker.number.int({ min: 0, max: 50 }),
      memberSince: faker.date.past({ years: 2 }),

      emailNotification: faker.datatype.boolean(0.8),
      smsNotification: faker.datatype.boolean(0.2),
      marketingEmail: faker.datatype.boolean(),
      orderUpdate: true, 
      newArrival: faker.datatype.boolean(),
      saleAlert: faker.datatype.boolean(),
    };
  });

  try {

    const created = await prisma.user.createMany({
      data: users,
      skipDuplicates: true, 
    });

    console.log(`boa, ${created.count} usuários inseridos.`);
  } catch (e) {
    console.error("Erro ao inserir usuários:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
