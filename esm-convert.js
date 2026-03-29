import fs from 'fs';
import path from 'path';

function processFile(filePath) {
    if (filePath.endsWith('esm-convert.js')) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // 1. const { a, b } = require('c')
    content = content.replace(/(^|\n\s*)(?:const|let|var)\s+\{([^}]+)\}\s*=\s*require\((['"])(.*?)(['"])\);?/g, (match, prefix, vars, q1, pkg, q2) => {
        if (pkg.startsWith('.') && !pkg.endsWith('.js') && !pkg.endsWith('.json')) pkg += '.js';
        return `${prefix}import {${vars.replace(/\n/g, ' ')}} from ${q1}${pkg}${q2};`;
    });

    // 2. const x = require('y')
    content = content.replace(/(^|\n\s*)(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*require\((['"])(.*?)(['"])\);?/g, (match, prefix, varName, q1, pkg, q2) => {
        if (pkg.startsWith('.') && !pkg.endsWith('.js') && !pkg.endsWith('.json')) pkg += '.js';
        return `${prefix}import ${varName} from ${q1}${pkg}${q2};`;
    });

    // 3. require('x'); or simply require('x')
    content = content.replace(/(^|\n\s*)require\((['"])(.*?)(['"])\);?/g, (match, prefix, q1, pkg, q2) => {
        if (pkg.startsWith('.') && !pkg.endsWith('.js') && !pkg.endsWith('.json')) pkg += '.js';
        return `${prefix}import ${q1}${pkg}${q2};`;
    });

    // 4. exports.xyz = ... -> export const xyz = ...
    content = content.replace(/^(\s*)exports\.([a-zA-Z0-9_$]+)\s*=\s*/gm, '$1export const $2 = ');

    // 5. module.exports = async (...)
    content = content.replace(/^(\s*)module\.exports\s*=\s*async/gm, '$1export default async');

    // 6. module.exports = { ... }
    content = content.replace(/^(\s*)module\.exports\s*=\s*\{/gm, '$1export {');

    // 7. module.exports = ...
    content = content.replace(/^(\s*)module\.exports\s*=\s*/gm, '$1export default ');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git') continue;
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.js') && file !== 'esm-convert.js') {
            processFile(fullPath);
        }
    }
}

walkDir('.');
