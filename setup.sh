mkdir jhu-lost-and-found
cd jhu-lost-and-found

mkdir -p frontend/src/app frontend/src/components frontend/public
mkdir -p backend/models backend/routes backend/controllers

cat > frontend/package.json <<EOL
{
  "name": "lost-and-found-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "^3.3.4",
    "postcss": "^8.4.24",
    "autoprefixer": "^10.4.14",
    "@radix-ui/react-icons": "^1.0.6",
    "shadcn-ui": "^0.4.2"
  },
  "devDependencies": {
    "typescript": "^5.2.2"
  }
}
EOL

cat > frontend/tailwind.config.js <<EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/shadcn-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
EOL

cat > frontend/postcss.config.js <<EOL
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

cat > frontend/tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOL

cat > frontend/src/app/globals.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

cat > frontend/src/app/layout.tsx <<EOL
import './globals.css'

export const metadata = {
  title: 'Lost and Found',
  description: 'JHU Lost and Found App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOL

cat > frontend/src/app/page.tsx <<EOL
import { Button } from '../components/Button'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to JHU Lost and Found</h1>
      <Button>Get Started</Button>
    </main>
  )
}
EOL

cat > frontend/src/components/Button.tsx <<EOL
interface ButtonProps {
  children: React.ReactNode
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      {children}
    </button>
  )
}
EOL

cat > backend/package.json <<EOL
{
  "name": "lost-and-found-backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only app.ts",
    "start": "node dist/app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@types/express": "^4.17.21",
    "@types/node": "^20.6.1",
    "ts-node-dev": "^2.0.0"
  }
}
EOL

cat > backend/tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "rootDir": "./",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts"]
}
EOL

cat > backend/app.ts <<EOL
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
EOL

cat > backend/models/Item.ts <<EOL
import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  found: boolean;
  location: string;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  found: { type: Boolean, default: false },
  location: { type: String },
}, { timestamps: true });

export default mongoose.model<IItem>('Item', ItemSchema);
EOL

cat > backend/controllers/itemController.ts <<EOL
import { Request, Response } from 'express';
import Item from '../models/Item';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
EOL

cat > backend/routes/itemRoutes.ts <<EOL
import express from 'express';
import { getItems, createItem } from '../controllers/itemController';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);

export default router;
EOL

cat > backend/.env <<EOL
MONGO_URI=your_mongodb_connection_string
PORT=5000
EOL

touch .gitignore

echo "✅ Full project structure created with all starter files."

