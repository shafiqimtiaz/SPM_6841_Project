import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const manager = await prisma.users.upsert({
    where: { email: "m@spm.com" },
    update: {},
    create: {
      name: "Manager",
      address: "Montreal",
      email: "m@spm.com",
      date_of_birth: new Date("1986-02-20 00:00:00.00"),
      phone_number: "514-304-3434",
      password: bcrypt.hashSync("123456", 10),
      role: "manager",
    },
  });

  const p1 = await prisma.users.upsert({
    where: { email: "p1@spm.com" },
    update: {},
    create: {
      name: "Patient 1",
      address: "Montreal",
      email: "p1@spm.com",
      date_of_birth: new Date("1991-08-20 00:00:00.00"),
      phone_number: "514-304-3434",
      password: bcrypt.hashSync("123456", 10),
      role: "patient",
    },
  });

  await prisma.patients.create({
    data: {
      patient_id: p1.user_id,
    },
  });

  const p2 = await prisma.users.upsert({
    where: { email: "p2@spm.com" },
    update: {},
    create: {
      name: "Patient 2",
      address: "Montreal",
      email: "p2@spm.com",
      date_of_birth: new Date("1990-10-10 00:00:00.00"),
      phone_number: "514-304-3434",
      password: bcrypt.hashSync("123456", 10),
      role: "patient",
    },
  });

  await prisma.patients.create({
    data: {
      patient_id: p2.user_id,
    },
  });

  const c1 = await prisma.users.upsert({
    where: { email: "c1@spm.com" },
    update: {},
    create: {
      name: "Counselor 1",
      address: "Montreal",
      email: "c1@spm.com",
      date_of_birth: new Date("1980-10-12 00:00:00.00"),
      phone_number: "514-304-3434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199254740991",
          type: "c",
        },
      },
    },
  });

  const c2 = await prisma.users.upsert({
    where: { email: "c2@spm.com" },
    update: {},
    create: {
      name: "Counselor 2",
      address: "Montreal",
      email: "c2@spm.com",
      date_of_birth: new Date("1980-10-12 00:00:00.00"),
      phone_number: "514-304-3434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199254740991",
          type: "c",
        },
      },
    },
  });

  const d1 = await prisma.users.upsert({
    where: { email: "d1@spm.com" },
    update: {},
    create: {
      name: "Doctor 1",
      address: "Montreal",
      email: "d1@spm.com",
      date_of_birth: new Date("1970-10-12 00:00:00.00"),
      phone_number: "514-304-3434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199959640881",
          type: "d",
        },
      },
    },
  });

  const d2 = await prisma.users.upsert({
    where: { email: "d2@spm.com" },
    update: {},
    create: {
      name: "Doctor 2",
      address: "Montreal",
      email: "d2@spm.com",
      date_of_birth: new Date("1970-10-12 00:00:00.00"),
      phone_number: "514-304-3434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199959640881",
          type: "d",
        },
      },
    },
  });

  console.log({ manager, p1, p2, c1, c2, d1, d2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
