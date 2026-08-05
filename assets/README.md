# Assets

A página **não usa fotos**. O rosto do RAFA VOLD aparece pelo VSL no hero — todos os
slots de imagem que existiam antes (hero, retrato, bastidores, prints) foram removidos
do HTML e o CSS correspondente saiu junto.

## Único arquivo ainda necessário

| Arquivo | Onde | Formato | O que é |
|---|---|---|---|
| `vold/og-kit-creator-pack.jpg` | `<meta property="og:image">` | 1200×630 | Card de compartilhamento (WhatsApp, Instagram, X). Pode ser puramente gráfico: fundo preto, "KIT CREATOR PACK" em Outfit 800 e um detalhe lime — **não precisa de foto**. |

Enquanto esse arquivo não existir, o link compartilhado aparece sem imagem de preview.
O resto da página funciona normalmente.

## Se um dia entrarem fotos

O histórico do git tem a versão com os slots prontos. Se preferir refazer do zero, o
padrão era um `<figure class="slot">` com borda tracejada lime, aspect-ratio fixo e
o caminho do arquivo impresso na tela.
