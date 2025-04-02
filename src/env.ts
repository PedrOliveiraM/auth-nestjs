import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().default('JWT_SECRET'),
  MONGODB_URI: z.string().default('mongodb://localhost/auth_nestjs'),
  JWT_EXPIRES_IN: z.string().default('1000s'),
  JWT_ISSUER: z.string().default('issuer'),
})

export const env = envSchema.parse(process.env)
