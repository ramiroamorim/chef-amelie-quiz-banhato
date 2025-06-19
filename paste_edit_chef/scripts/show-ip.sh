#!/bin/bash

echo "=== IPs disponíveis para teste ==="
echo "Localhost: http://127.0.0.1:3000"
echo ""

# Mostrar IPs de rede
echo "IPs de rede:"
ifconfig | grep 'inet ' | grep -v 127.0.0.1 | awk '{print "http://" $2 ":3000"}'

echo ""
echo "Para testar em outro dispositivo, use um dos IPs acima"
echo "Certifique-se de que o firewall permite conexões na porta 3000" 