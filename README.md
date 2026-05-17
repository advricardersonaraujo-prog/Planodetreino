# Planos de Treino

Aplicativo React/Vite para planos de treino, cronograma, edicao de exercicios e timer de descanso.

## Sincronizacao entre dispositivos

O app funciona offline com `localStorage` e tambem esta preparado para sincronizar o historico com Supabase.

1. Crie um projeto em https://supabase.com.
2. No painel do Supabase, abra SQL Editor e execute o arquivo `supabase.sql`.
3. Em Authentication > URL Configuration, configure:
   - Site URL: `https://planodetreino.vercel.app`
   - Redirect URLs: `https://planodetreino.vercel.app/*`
4. Em Project Settings > API, copie:
   - Project URL
   - anon public key
5. Na Vercel, em Settings > Environment Variables, adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Faca um novo deploy na Vercel.

Depois disso, abra a aba Historico no app, informe seu e-mail e use o link magico de acesso. Cada treino encerrado sera salvo localmente e sincronizado na nuvem.

## Rodar localmente

```bash
npm install
npm run dev
```

URL local:

```txt
http://127.0.0.1:5173
```

## Acesso na intranet

Use o servidor de producao local escutando em todas as interfaces:

```bash
npm run build
npm run serve
```

Depois descubra o IPv4 do computador:

```powershell
ipconfig
```

No celular ou outro computador da mesma rede, acesse:

```txt
http://SEU-IP:5173
```

Exemplo:

```txt
http://192.168.0.185:5173
```

Se nao abrir, libere o Node.js ou a porta 5173 no Firewall do Windows para redes privadas.

## Acesso na extranet

Opcao recomendada: publicar em uma plataforma de hospedagem estatica.

### Vercel

1. Suba este projeto para um repositorio Git.
2. Importe o repositorio na Vercel.
3. A Vercel usa `vercel.json`, roda `npm run build` e publica `dist`.

### Netlify

1. Suba este projeto para um repositorio Git.
2. Importe o repositorio no Netlify.
3. O Netlify usa `netlify.toml`, roda `npm run build` e publica `dist`.

### Docker

```bash
docker build -t planos-treino .
docker run --rm -p 5173:5173 planos-treino
```

## Tunel temporario

Para testar fora da rede sem deploy definitivo, use um tunel:

```bash
ngrok http 5173
```

ou Cloudflare Tunnel apontando para:

```txt
http://localhost:5173
```

## Observacoes

- O app salva edicoes e historico no `localStorage` do navegador.
- Com Supabase configurado, o historico de treinos sincroniza entre dispositivos com login por e-mail.
- O Coach IA esta offline/local. Para IA real, use um backend proxy para proteger a chave da API.
