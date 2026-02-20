import { prisma } from "../../config/prisma";
import { fakerPT_BR as faker } from '@faker-js/faker';

export async function seedProducts(amount: number = 20) {
  console.log(`Gerando ${amount} produtos com variantes`);

  try {
    for (let i = 0; i < amount; i++) {
      const name = faker.commerce.productName();
      const basePrice = parseFloat(faker.commerce.price({ min: 50, max: 500 }));

      await prisma.product.create({
        data: {
          name,
          description: faker.commerce.productDescription(),
          price: basePrice,
          rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
          numOfReviews: faker.number.int({ min: 0, max: 100 }),
          isOutOfStock: faker.datatype.boolean(0.1),
          
            variant: {
            create: generateVariants()
          }
        },
      });
    }

    console.log(`boa, ${amount} produtos e suas variantes inseridos.`);
  } catch (e) {
    console.error("Erro ao inserir produtos:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}


function generateVariants() {
  const colors = ['black', 'white', 'blue', 'red', 'green'];
  const sizes = ['P', 'M', 'G', 'GG'];

  const variantsData: { color: string; size: string; stock: number }[] = [];
  
  const variantCount = faker.number.int({ min: 1, max: 4 });

  for (let i = 0; i < variantCount; i++) {
    const variant = {
      color: faker.helpers.arrayElement(colors),
      size: faker.helpers.arrayElement(sizes),
      stock: faker.number.int({ min: 0, max: 100 })
    };

    const isDuplicate = variantsData.some(v => v.color === variant.color && v.size === variant.size);
    if (!isDuplicate) {
      variantsData.push(variant);
    }
  }

  return variantsData;
}