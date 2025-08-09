import db from "../../../db";
import { advocates, specialties, advocateSpecialties } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  // 1. Insert all unique specialties
  const allSpecialties = Array.from(
    new Set(advocateData.flatMap(a => a.specialties))
  );
  const specialtyRecords = await db
    .insert(specialties)
    .values(allSpecialties.map(name => ({ name })))
    .onConflictDoNothing()
    .returning();

  // 2. Insert advocates (without specialties)
  const advocateRecords = await db
    .insert(advocates)
    .values(
      advocateData.map(({ specialties, ...rest }) => rest)
    )
    .onConflictDoNothing()
    .returning();

  // 3. Insert into join table
  for (let i = 0; i < advocateRecords.length; i++) {
    const advocate = advocateRecords[i];
    const advocateSpecialtiesList = advocateData[i].specialties;
    for (const specialtyName of advocateSpecialtiesList) {
      const specialty = specialtyRecords.find(s => s.name === specialtyName);
      if (specialty) {
        await db.insert(advocateSpecialties).values({
          advocateId: advocate.id,
          specialtyId: specialty.id,
        });
      }
    }
  }

  return Response.json({ advocates: advocateRecords });
}
