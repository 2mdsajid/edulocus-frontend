import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(__dirname, '../src/app');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/routes.ts');

interface Route {
    path: string;
    dynamicParams?: string[];
    searchParams?: string[];
}

const extractParams = (filePath: string): { searchParams: string[], dynamicParams: string[] } => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const searchMatch = content.match(/searchParams:\s*{([^}]*)}/);
    const paramsMatch = content.match(/params:\s*{([^}]*)}/);
    const searchParams = searchMatch ? Array.from(searchMatch[1].matchAll(/([a-zA-Z0-9_]+):/g)).map(m => m[1]) : [];
    const dynamicParams = paramsMatch ? Array.from(paramsMatch[1].matchAll(/([a-zA-Z0-9_]+):/g)).map(m => m[1]) : [];
    
    return { searchParams, dynamicParams };
};

const parseDirectory = (dir: string, basePath = ''): Route[] => {
    const routes: Route[] = [];
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const isDynamic = file.startsWith('[') && file.endsWith(']');
            const paramName = isDynamic ? file.slice(1, -1) : file;
            routes.push(...parseDirectory(fullPath, `${basePath}/${paramName}`));
        } else if (file === 'page.tsx') {
            const { searchParams, dynamicParams } = extractParams(fullPath);
            routes.push({ path: basePath || '/', searchParams, dynamicParams });
        }
    });

    return routes;
};

const routes = parseDirectory(APP_DIR);
const outputContent = `export const routes = ${JSON.stringify(routes, null, 4)};
export type Route = ${JSON.stringify(routes, null, 4)};`;

fs.writeFileSync(OUTPUT_FILE, outputContent, 'utf-8');
console.log(`Routes generated in ${OUTPUT_FILE}`);
