# Planos de Treino

Aplicativo React/Vite para planos de treino, cronograma, edicao de exercicios e timer de descanso.

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

- O app salva edicoes no `localStorage` do navegador.
- Para dados compartilhados entre varios usuarios/dispositivos, sera necessario adicionar backend e autenticacao.
- O Coach IA esta offline/local. Para IA real, use um backend proxy para proteger a chave da API.
