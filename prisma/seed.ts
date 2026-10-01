import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client';
import { hash } from 'bcryptjs';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Falta DATABASE_URL en el archivo .env');
}

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando seed...');

  // 1. Crear tres tenants.
  for (const id of [1, 2, 3]) {
    await prisma.tenant.upsert({
      where: { id },
      update: {},
      create: { id },
    });
  }

  // Contraseña compartida únicamente para esta práctica.
  const passwordHash = await hash('Practica123!', 10);

  // 2. Preparar usuarios distribuidos entre los tenants.
  const usuarios: {
    email: string;
    name: string;
    telephone: string;
    role: 'ADMIN' | 'USER';
    tenantId: number;
  }[] = [
    {
      email: 'admin@example.com',
      name: 'Administrador',
      telephone: '88880001',
      role: 'ADMIN',
      tenantId: 1,
    },
    {
      email: 'usuario@example.com',
      name: 'Usuario de prueba',
      telephone: '88880002',
      role: 'USER',
      tenantId: 1,
    },
    {
      email: 'ana@example.com',
      name: 'Ana Martinez',
      telephone: '88880003',
      role: 'USER',
      tenantId: 1,
    },
    {
      email: 'carlos@example.com',
      name: 'Carlos Lopez',
      telephone: '88880004',
      role: 'USER',
      tenantId: 1,
    },
    {
      email: 'admin2@example.com',
      name: 'Administrador Dos',
      telephone: '88880005',
      role: 'ADMIN',
      tenantId: 2,
    },
    {
      email: 'maria@example.com',
      name: 'Maria Garcia',
      telephone: '88880006',
      role: 'USER',
      tenantId: 2,
    },
    {
      email: 'jose@example.com',
      name: 'Jose Rodriguez',
      telephone: '88880007',
      role: 'USER',
      tenantId: 2,
    },
    {
      email: 'sofia@example.com',
      name: 'Sofia Hernandez',
      telephone: '88880008',
      role: 'USER',
      tenantId: 2,
    },
    {
      email: 'admin3@example.com',
      name: 'Administrador Tres',
      telephone: '88880009',
      role: 'ADMIN',
      tenantId: 3,
    },
    {
      email: 'diego@example.com',
      name: 'Diego Perez',
      telephone: '88880010',
      role: 'USER',
      tenantId: 3,
    },
    {
      email: 'valeria@example.com',
      name: 'Valeria Torres',
      telephone: '88880011',
      role: 'USER',
      tenantId: 3,
    },
    {
      email: 'luis@example.com',
      name: 'Luis Ramirez',
      telephone: '88880012',
      role: 'USER',
      tenantId: 3,
    },
  ];

  // 3. Crear los usuarios y sus perfiles.
  for (const datos of usuarios) {
    const usuario = await prisma.user.upsert({
      where: { email: datos.email },
      update: {},
      create: {
        ...datos,
        password: passwordHash,
      },
    });

    await prisma.profile.upsert({
      where: { userId: usuario.id },
      update: {},
      create: {
        userId: usuario.id,
      },
    });

    console.log(`Usuario y perfil disponibles: ${usuario.email}`);
  }

  console.log('Seed completado.');
  console.log({
    tenants: await prisma.tenant.count(),
    usuarios: await prisma.user.count(),
    perfiles: await prisma.profile.count(),
  });
}

main()
  .catch((error) => {
    console.error('Error al ejecutar el seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });