const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
    ];
    // Nomes criativos para as barbearias
    const creativeNames = ["Império Barbearia"];

    // Endereços fictícios para as barbearias
    const addresses = ["Rua Professor Edgar de Arruda, 356 - Jóquei Clube"];

    const services = [
      {
        "name": "Degradê",
        "description": "Corte degradê para transição suave entre diferentes tipos de cabelos.",
        "price": 30.0,
        "imageUrl": "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"
       },
       {
        "name": "Degradê + Barba",
        "description": "Modelagem completa para destacar masculinidade.",
        "price": 50.0,
        "imageUrl": "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png"
       },
       {
        "name": "Social",
        "description": "Corte clássico com uniformidade de comprimento.",
        "price": 25.0,
        "imageUrl": "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png"
       },
       {
        "name": "Social + Barba",
        "description": "Modelagem precisa para expressão acentuada.",
        "price": 45.0,
        "imageUrl": "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png"
       },
       {
        "name": "Corte na Tesoura",
        "description": "Modelagem precisa para expressão acentuada.",
        "price": 45.0,
        "imageUrl": "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png"
       },
       {
        "name": "Degradê + Barba + Sobrancelha",
        "description": "Cuidados com sobrancelhas, incluindo modelagem, aparagem e remoção de pelos.",
        "price": 10.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Limpeza de Pele",
        "description": "Hidratação profunda para cabelo e barba.",
        "price": 20.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Hidratação",
        "description": "Hidratação profunda para cabelo e barba.",
        "price": 15.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Platinado (Nevou)",
        "description": "Descoloração capilar para tom de platina.",
        "price": 20.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Luzes",
        "description": "Hidratação profunda para cabelo e barba.",
        "price": 50.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Alinhamento de Fios",
        "description": "Alinhamento capilar com Ácido Hialurônico e Manteiga de Karité.",
        "price": 20.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Pigmentação",
        "description": "Alinhamento capilar com Ácido Hialurônico e Manteiga de Karité.",
        "price": 10.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Aplicação de Tinta",
        "description": "Alinhamento capilar com Ácido Hialurônico e Manteiga de Karité.",
        "price": 20.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       },
       {
        "name": "Penteado + Lavagem + Escova",
        "description": "Alinhamento capilar com Ácido Hialurônico e Manteiga de Karité.",
        "price": 15.0,
        "imageUrl": "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
       }
       
    ];

    // Criar 10 barbearias com nomes e endereços fictícios
    const barbershops = [];
    for (let i = 0; i < 1; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      barbershops.push(barbershop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
