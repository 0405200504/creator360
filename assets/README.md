# Assets

A página **não usa fotos**. O rosto do RAFA VOLD aparece pelo VSL no hero — todos os
slots de imagem que existiam antes (hero, retrato, bastidores, prints) foram removidos
do HTML e o CSS correspondente saiu junto.

## Capas da área de membros

`capas/` tem as 10 capas dos módulos que passam em esteira na seção "O que vem junto".
São WebP de 480×853 (o dobro do tamanho exibido, pra ficar nítido em retina), com
cerca de 35 KB cada. Os originais em PNG tinham ~2,4 MB e **não** devem ir direto pra
pasta. Pra trocar ou adicionar uma capa, exporte no mesmo formato e repita o `<li>`
nas duas cópias da lista em `index.html` (a segunda, com `aria-hidden`, fecha o loop).

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
