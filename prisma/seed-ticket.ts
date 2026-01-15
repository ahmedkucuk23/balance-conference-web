import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Early Bird ticket...')

  // Check if ticket already exists
  const existingTicket = await prisma.ticket.findFirst({
    where: {
      name: 'Early Bird Pass'
    }
  })

  if (existingTicket) {
    console.log('Early Bird ticket already exists:', existingTicket.id)
    return
  }

  // Create Early Bird ticket
  const ticket = await prisma.ticket.create({
    data: {
      name: 'Early Bird Pass',
      description: 'Osigurajte pristup Balance Conference 2026 sa ekskluzivnom Early Bird cijenom. Uključuje potpuni pristup svim keynote predavanjima, radionicama, "Balance" welcome kit, i rani pristup networking sesijama.',
      price: 250,
      currency: 'BAM',
      quantity: 300,
      soldCount: 0,
      isAvailable: true,
      isFeatured: true,
      benefits: JSON.stringify([
        'Potpuni pristup svim keynote predavanjima i radionicama',
        '"Balance" welcome kit',
        'Rani pristup networking sesijama i govornicima'
      ]),
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2026-03-01'),
    }
  })

  console.log('Created Early Bird ticket:', ticket.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



