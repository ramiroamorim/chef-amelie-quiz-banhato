#!/bin/bash
# Script para preparar o deploy

# Certifique-se de que a pasta public existe
mkdir -p public
mkdir -p dist/public

# Copie o index.html para a pasta pública
cp public/index.html dist/public/index.html

echo "Arquivos preparados para deploy!"
