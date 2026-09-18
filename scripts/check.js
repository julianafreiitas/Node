import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function listarJavaScript(diretorio) {
    const arquivo = [];
    for (const item of readdirSync(diretorio, {
        withFileTypes:true
    })) {
        if (item.name === 'node_modules') continue;
        const caminho = join(diretorio,item.name);
        if (item.isDirectory()) {
            arquivo.push(...listarJavaScript(caminho));
        } else if (item.isFile() && item.name.endsWith('.js')) {
            arquivo.push(caminho);
        }
    }
    return arquivo;
}
const arquivos = listarJavaScript(process.cwd()); for (const arquivo of arquivos) {
    const resultado = spawnSync(process.execPath, ['--check', arquivo], {stdio: 'inherit' });
    if(resultado.status !== 0) {
        process.exitCode = resultado.status || 1;
        break;
    }
}
if (!process.exitCode) {
    console.log(`${arquivos.length} arquivos JavaSript verificados.`);
    
}