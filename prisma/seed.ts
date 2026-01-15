import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const speakers2026 = [
  {
    slug: "jasna-bajraktarevic",
    name: "Prof. Dr. Jasna Bajraktarevic",
    topic: "Motivacijski imunitet: Kako ostati motivisan kada zivot i posao kazu NE!",
    bio: "Prof. Dr. Jasna Bajraktarevic je profesorica i predavacica na vise Univerziteta, autorica 70+ radova i 13 knjiga. Osnivacica je Psynergy Education & Consulting u kojem tim terapeuta pruza strucno psiholosko savjetovanje, dijagnostiku i terapijski rad, pomazuci klijentima da pronadu unutrasnju ravnotezu, prevazidu prepreke i izgrade kvalitetniji zivot.",
    details: "Na konferenciju dolazi sa 7 clanova tima i uredajima za dijagnostiku kako bi pomogli polaznicima da definiraju svoje stanje i dobiju savjete kako da ostvare svoj puni potencijal. Tokom predavanja na temu motivacijskog imuniteta predstavit ce i alate za samorazumijevanje i jacanje otpornosti u namjeri da cuvamo motivaciju kroz stres, neuspjehe ili promjene.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
    link: "https://www.psynergyeducation.com",
    location: "Sarajevo, BiH",
    isTbd: false,
    year: 2026,
    order: 1,
  },
  {
    slug: "bedirhan-ustun",
    name: "Prof.Dr. Bedirhan Ustun",
    topic: "Pronadi motivaciju da pobjedis lose navike",
    bio: "Prof.Dr. Bedirhan Ustun je psihijatar iz Istanbula, sa vise od 41 godine iskustva. Etablirao se kao istaknuti strucnjak za mentalno zdravlje, a posebno za lijecenje ovisnosti poznatih osoba. Diplomirao je na Medicinskom fakultetu Univerziteta Hacettepe 1982. godine i tamo zavrsio specijalizaciju iz psihijatrije.",
    details: "Tokom svoje karijere, dr. Ustun je obavljao razne prestizne pozicije, ukljucujuci rad na Univerzitetu Harvard, vise od 20 godina u Svjetskoj zdravstvenoj organizaciji u Zenevi, a trenutno je sef Odjeljenja za psihijatriju u Americkoj bolnici u Istanbulu. Tokom predavanja ce nam predstaviti lose navike koje ubijaju motivaciju i na koji nacin da se borimo protiv njih kako bismo svaki dan ustajali motivirani i puni energije.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60",
    link: "https://airomedical.com/doctors/prof-dr-bedirhan-ustun",
    location: "Istanbul, Turska",
    isTbd: false,
    year: 2026,
    order: 2,
  },
  {
    slug: "zeynep-aksoy",
    name: "Zeynep Aksoy",
    topic: "Reset and Reconnect with your body and mind!",
    bio: "Zeynep Aksoy je napustila karijeru u marketing agenciji u New Yorku, vratila se u Istanbul i danas je jedna od najpoznatijih joga strucnjaka u Turskoj. Nakon 30 godina iskustva, sazela je najvaznije elemente zdravlja u treninzima fascije joge pod imenom Reset and Reconnect with your body and mind.",
    details: "Dvosmjerni odnos izmedu nervnog sistema i fascije cini jogu idealnim nacinom za rjesavanje problema kako fizickog zdravlja, tako i mentalnog blagostanja. Laganom, razigranom i ugodnom stimulacijom naseg tijela, ne mozemo uticati samo na bolove i blagostanje u nasem biofizickom stanju, vec i na stanje naseg nervnog sistema, raspolozenje, pa cak i na to kako percipiramo stvari.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
    link: "https://www.zeynepaksoyreset.com",
    location: "Istanbul, Turska",
    isTbd: false,
    year: 2026,
    order: 3,
  },
  {
    slug: "naida-kundurovic",
    name: "Naida Kundurovic",
    topic: "Redizajniraj zivot nakon 35",
    bio: "Naida Kundurovic je gestalt psihoterapeutkinja, poduzetnica i osnivacica platforme za mentalno zdravlje - Aya's Touch. Dugogodisnja karijera u show businessu i pred televizijskim kamerama pruzila joj je priliku steci bogato iskustvo u javnom nastupu i podizanju svijesti o vaznosti mentalnog zdravlja.",
    details: "Na Balance Conference – Get Motivated ce ispricati sta je motiviralo da reprogramira svoj zivot u 30tim, u potpunosti promijeni zivot i karijeru. Dat ce nam prakticne savjete i korake koji svima mogu pomoci da promjenom dodu do balansa.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60",
    link: "https://www.ayas-touch.com",
    location: "Sarajevo, BiH",
    isTbd: false,
    year: 2026,
    order: 4,
  },
  {
    slug: "jovana-pribic",
    name: "Jovana Pribic",
    topic: "Prevari svoj mozak i osjecaj se kao superheroj",
    bio: "Jovana Pribic je medunarodna Coach Master i NLP Master trenerica, prepoznata po svom integrativnom pristupu licnoj transformaciji i emocionalnom blagostanju. Karijeru je posvetila pomaganju pojedincima da otkljucaju svoju unutrasnju snagu povezivanjem uma, emocija i tijela u skladan sistem svakodnevne otpornosti.",
    details: "Njeni programi fokusiraju se na prakticne alate koji preoblikuju obrasce misljenja, regulisu emocije i aktiviraju prirodnu sposobnost tijela da obnovi ravnotezu. Na konferenciji ce predstaviti niz vjezbi koje brzo mijenjaju hemiju u mozgu i pomazu nam da se brzo vratimo u balans.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
    link: "https://integracentar.rs",
    location: "Beograd, Srbija",
    isTbd: false,
    year: 2026,
    order: 5,
  },
  {
    slug: "tbd-pobjednicki-mentalitet",
    name: "TBD",
    topic: "Pobjednicki mentalitet",
    bio: "Uskoro cemo objaviti ime predavaca koji ce nam govoriti o pobjednickom mentalitetu i kako ga izgraditi bez izgaranja.",
    details: null,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60",
    link: null,
    location: null,
    isTbd: true,
    year: 2026,
    order: 6,
  },
  {
    slug: "tbd-anksioznost",
    name: "TBD",
    topic: "Pobijedi anksioznost",
    bio: "Uskoro cemo objaviti ime strucnjaka koji ce nam pomoci da razumijemo i savladamo anksioznost.",
    details: null,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60",
    link: null,
    location: null,
    isTbd: true,
    year: 2026,
    order: 7,
  },
  {
    slug: "tbd-standup",
    name: "TBD",
    topic: "Stand-up",
    bio: "Ocekujte puno smijeha! Uskoro otkrivamo ko ce nas zabavljati na konferenciji.",
    details: null,
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60",
    link: null,
    location: null,
    isTbd: true,
    year: 2026,
    order: 8,
  },
]

async function main() {
  console.log('Seeding database...')

  // Clear existing speakers
  await prisma.speaker.deleteMany({})

  // Insert speakers
  for (const speaker of speakers2026) {
    await prisma.speaker.create({
      data: speaker,
    })
    console.log(`Created speaker: ${speaker.name}`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
