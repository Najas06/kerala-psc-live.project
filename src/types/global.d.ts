// src/types/global.d.ts
import { Mongoose } from 'mongoose';

declare global {
  let mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// This line is important to make sure the file is treated as a module.
// You can also just have an empty export like `export {};`
export {};