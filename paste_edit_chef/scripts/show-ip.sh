#!/bin/bash

echo "=== IPs IPv6 disponíveis para teste ==="
echo "Localhost: http://[::1]:3000"
echo ""

# Mostrar IPs de rede IPv6
IPV6S=$(ifconfig | grep 'inet6 ' | grep -v 'fe80' | awk '{print $2}')
echo "IPs de rede (IPv6):"
for ip in $IPV6S; do
  echo "http://[$ip]:3000"
done

echo ""
# Mostrar IP público IPv6 via ipinfo.io
PUB_IPV6=$(curl -6 -s "https://ipinfo.io/ip")
if [[ $PUB_IPV6 == *":"* ]]; then
  echo "IP público (IPv6): $PUB_IPV6"
  echo "Acesse: http://[$PUB_IPV6]:3000 (se o roteador permitir)"
else
  echo "Não foi possível obter o IP público IPv6. Sua rede pode não suportar IPv6."
fi

echo ""
echo "Para testar em outro dispositivo, use um dos IPs acima. Certifique-se de que o firewall e o roteador permitem conexões na porta 3000 e que sua rede suporta IPv6." 