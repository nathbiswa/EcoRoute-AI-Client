import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

// Singleton MongoClient — reuse across hot-reloads in dev
const globalWithMongo = global as typeof globalThis & { _mongoClient?: MongoClient };

if (!globalWithMongo._mongoClient) {
  globalWithMongo._mongoClient = new MongoClient(process.env.MONGODB_URI as string);
}

const client = globalWithMongo._mongoClient;

// Connect if not already connected
await client.connect().catch((err) => {
  console.error("❌ better-auth MongoDB connect failed:", err.message);
});

// Target the EcoRouteAI database
const db = client.db("EcoRouteAI");

export const auth = betterAuth({
  // Required: must match BETTER_AUTH_URL in .env
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // Required: secret for signing tokens/sessions
  secret: process.env.BETTER_AUTH_SECRET,

  // Allow requests from the frontend origin
  trustedOrigins: ["http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [jwt()],
});