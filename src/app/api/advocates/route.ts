import { asc, eq, inArray, count, ilike, or } from "drizzle-orm";
import db from "../../../db";
import { advocates, specialties, advocateSpecialties } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";
  const offset = (page - 1) * limit;

  // Build search conditions
  let whereCondition;

  if (search) {
    // Create a subquery to find advocates with matching specialties
    const advocatesWithMatchingSpecialties = db
      .select({ id: advocateSpecialties.advocateId })
      .from(advocateSpecialties)
      .innerJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
      .where(ilike(specialties.name, `%${search}%`));

    // Combine advocate field search with specialty search
    whereCondition = or(
      ilike(advocates.firstName, `%${search}%`),
      ilike(advocates.lastName, `%${search}%`),
      ilike(advocates.city, `%${search}%`),
      ilike(advocates.degree, `%${search}%`),
      inArray(advocates.id, advocatesWithMatchingSpecialties)
    );
  }

  // 1. Get paginated advocates with search
  const advocateRows = await db
    .select()
    .from(advocates)
    .where(whereCondition)
    .orderBy(asc(advocates.id))
    .limit(limit)
    .offset(offset);

  // 1.1. Get total count for pagination with search
  const totalCountResult = await db
    .select({ count: count() })
    .from(advocates)
    .where(whereCondition);
  const total = totalCountResult[0]?.count || 0;

  // 2. Get specialties for these advocates
  const advocateIds = advocateRows.map(a => a.id);
  const specialtiesRows = await db
    .select({
      advocateId: advocateSpecialties.advocateId,
      specialtyName: specialties.name,
    })
    .from(advocateSpecialties)
    .innerJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
    .where(inArray(advocateSpecialties.advocateId, advocateIds));

  // 3. Map specialties to advocates
  const specialtiesMap: Record<number, string[]> = {};
  for (const row of specialtiesRows) {
    if (!specialtiesMap[row.advocateId]) specialtiesMap[row.advocateId] = [];
    specialtiesMap[row.advocateId].push(row.specialtyName);
  }

  const data = advocateRows.map(a => ({
    ...a,
    specialties: specialtiesMap[a.id] || [],
  }));

  return Response.json({
    data,
    page,
    limit,
    total
  });
}
