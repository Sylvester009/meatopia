// prisma/seed.ts
import { products } from '@/data/product';
import { PrismaClient } from '@/lib/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

// async function main() {
//   console.log('🌱 Starting seed...');

//   try {
//     // Clean database
//     await prisma.$transaction([
//       prisma.productImage.deleteMany(),
//       prisma.weightOption.deleteMany(),
//       prisma.nutritionalInfo.deleteMany(),
//       prisma.cookingTip.deleteMany(),
//       prisma.tag.deleteMany(),
//       prisma.product.deleteMany(),
//     ]);

//     console.log('🧹 Database cleaned.');
//     console.log(`📦 Seeding ${products.length} products...`);

//     for (const productData of products) {
//       const {
//         tags = [],
//         weightOptions = [],
//         details,
//         ...productCore
//       } = productData;

//       const cookingTips = details?.cookingTips || [];
//       const nutritionalInfo = details?.nutritionalInfo || [];

//       const product = await prisma.product.create({
//         data: {
//           ...productCore,
//           tags: {
//             create: tags,
//           },
//           cookingTips: {
//             create: cookingTips.map((tip: string) => ({ tip })),
//           },
//           nutritionalInfo: {
//             create: nutritionalInfo.map((info: string) => ({ info })),
//           },
//           weightOptions: {
//             create: weightOptions,
//           },
//         },
//       });

//       console.log(`✅ Created: ${product.name} (ID: ${product.id})`);
//     }

//     console.log('✨ Seeding complete!');
//   } catch (error) {
//     console.error('❌ Seeding failed:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main().catch(console.error);