import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const founder = await prisma.user.create({
    data: {
      name: "Kendrick Johnson",
      email: "kendrick.d3.johnson@gmail.com",
      emailVerified: faker.date.past(),
      image: "https://github.com/shadcn.png",
      password: await bcrypt.hash("password", 10),
      role: "FOUNDER",
      domains: {
        create: {
          name: "hiither.com",
        },
      },
    },
    include: {
      domains: true,
    },
  });

  await prisma.user.update({
    where: { id: founder.id },
    data: {
      permissions: {
        create: {
          access: "OWNER",
          domain: {
            connect: { id: founder.domains[0].id },
          },
          panels: {
            create: {
              title: faker.book.title(),
              isPublished: faker.datatype.boolean(0.5),
            },
          },
        },
      },
    },
  });

  const generateDomainOwners = async (num) => {
    for (let i = 0; i < num; i++) {
      let user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: `kendrick.d3.johnson+${i + 1}@gmail.com`,
          emailVerified: faker.date.past(),
          image: faker.datatype.boolean(0.5) ? faker.image.avatar() : null,
          password: faker.datatype.boolean(0.5)
            ? await bcrypt.hash("password", 10)
            : null,
          domains: {
            create: {
              name: faker.internet.domainName(),
              logo: faker.datatype.boolean(0.5)
                ? faker.image.urlPicsumPhotos({ width: 128, height: 128 })
                : null,
            },
          },
        },
        include: {
          domains: true,
        },
      });

      faker.datatype.boolean(0.4)
        ? await prisma.user.update({
            where: { id: user.id },
            data: {
              permissions: {
                create: {
                  access: "OWNER",
                  domain: {
                    connect: { id: user.domains[0].id },
                  },
                },
              },
            },
          })
        : await prisma.user.update({
            where: { id: user.id },
            data: {
              permissions: {
                create: {
                  access: "OWNER",
                  domain: {
                    connect: { id: user.domains[0].id },
                  },
                  panels: {
                    create: {
                      title: faker.book.title(),
                      isPublished: faker.datatype.boolean(0.5),
                    },
                  },
                },
              },
            },
          });
    }
  };

  generateDomainOwners(10);
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
