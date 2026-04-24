import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@vidanavida.com';
  const password = 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email,
      name: 'Administrador Vida na Vida',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuário Admin criado/atualizado:');
  console.log('E-mail:', email);
  console.log('Senha:', password);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
