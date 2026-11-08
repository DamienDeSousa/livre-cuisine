import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Un seul pool par processus : en dev, le rechargement à chaud réévalue ce
// module, donc on le garde sur globalThis pour ne pas multiplier les connexions.
const globalPourPool = globalThis as typeof globalThis & { pgPool?: Pool };

const pool =
  globalPourPool.pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalPourPool.pgPool = pool;

export const db = drizzle({ client: pool, schema });
