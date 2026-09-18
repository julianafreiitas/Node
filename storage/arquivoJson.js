import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { basename, dirname, join } from 'node:path';

export async function lerJson(caminho) {
    let texto;
    try {
        texto = await readFile(caminho, 'utf8');
    } catch (erro) {
        //enoent é quando nn localiza o arquivo 
        if (erro.code === 'ENOENT') return [];
        throw erro;
    }
    try {
        const dados = JSON.parse(texto);
        if (!Array.isArray(dados))
            throw new TypeError("tipo de objeto inválido")
        return dados;
    }
    catch (erro) {
        if (erro instanceof SyntaxError){
            throw new SyntaxError (`JSON inválido em ${basename(caminho)}`)
        }
        throw erro;
    }
}
export async function gravaJson(caminho, dados) {
    if (!Array.isArray(dados)){
        throw new TypeError('Os dados gravados devem formar um array');
    }
    const diretorio = dirname(caminho);
    await mkdir(diretorio, {recursive:true});
    const temporario = join (diretorio, `.${basename(caminho)}.${randomUUID()}.tmp`);
    const texto = JSON.stringify (dados, null, 2);
    try{
        await writeFile(temporario, texto, 'utf8');
        await rename(temporario, caminho);
    } catch (erro) {
        await rm(temporario, {force:true}).catch(()=>undefined);
        throw erro;
    }
    
}