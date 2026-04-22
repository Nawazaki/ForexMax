const fs = require('fs');
const path = require('path');

const filesToFix = [
  {
    path: 'src/app/actions/brokers.ts',
    replace: [
      { from: /import { put } from "@vercel\/blob";/g, to: 'import { put } from "@vercel/blob";' },
      { from: /access: 'private'/g, to: "access: 'public'" }
    ]
  },
  {
    path: 'next.config.ts',
    content: `import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {\n  images: {\n    remotePatterns: [\n      {\n        protocol: "https",\n        hostname: "*.public.blob.vercel-storage.com",\n        port: "",\n      },\n    ],\n  },\n};\n\nexport default nextConfig;`
  }
];

filesToFix.forEach(file => {
  const fullPath = path.join(process.cwd(), file.path);
  if (fs.existsSync(fullPath)) {
    let content = file.content || fs.readFileSync(fullPath, 'utf8');
    if (file.replace) {
      file.replace.forEach(r => content = content.replace(r.from, r.to));
    }
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed: ${file.path}`);
  }
});
