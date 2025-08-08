import { asc, eq, inArray, count, ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates, specialties, advocateSpecialties } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
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

  // Get paginated advocates with search
  const advocateRows = await db
    .select({
      id: advocates.id,
      firstName: advocates.firstName,
      lastName: advocates.lastName,
      city: advocates.city,
      degree: advocates.degree,
      yearsOfExperience: advocates.yearsOfExperience,
      phoneNumber: advocates.phoneNumber,
      createdAt: advocates.createdAt,
      specialties: sql`COALESCE(array_agg(${specialties.name}), ARRAY[]::text[])`.as("specialties"),
    })
    .from(advocates)
    .leftJoin(
      advocateSpecialties,
      eq(advocates.id, advocateSpecialties.advocateId)
    )
    .leftJoin(
      specialties,
      eq(advocateSpecialties.specialtyId, specialties.id)
    )
    .where(whereCondition)
    .groupBy(advocates.id)
    .orderBy(asc(advocates.id))
    .limit(limit)
    .offset(offset);

  // Get total count for pagination with search
  const totalCountResult = await db
    .select({ count: count() })
    .from(advocates)
    .where(whereCondition);
  const total = totalCountResult[0]?.count || 0;

  const data = advocateRows

  return Response.json({
    data,
    page,
    limit,
    total
  });
}
