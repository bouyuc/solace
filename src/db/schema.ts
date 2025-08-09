import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

const advocateSpecialties = pgTable("advocate_specialties", {
  advocateId: integer("advocate_id")
    .notNull()
    .references(() => advocates.id),
  specialtyId: integer("specialty_id")
    .notNull()
    .references(() => specialties.id),
},
  (table) => ({
    advocateIdIdx: index("advocate_specialties_advocate_id_idx").on(table.advocateId),
    specialtyIdIdx: index("advocate_specialties_specialty_id_idx").on(table.specialtyId),
  })
);

export { advocates, specialties, advocateSpecialties };
