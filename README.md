# Emepar

App fullstack para criar enquetes/respostas desenvolvida para o teste seletivo da empar.

## Como executar?

O arquivo `docker-compose.yml` já define que ao subir o container a aplicação seja iniciada por meio do comando `npm run dev`. Portanto, basta executar o comando:

```bash
docker-compose up -d
```

### Onde acessar
```bash
#Após iciar os containers do docker vá em:
http://localhost:3001
```
### importante
O mysql pode demorar menos ou mais para rodar na sua máquina isso explica cado a aplcação demore mais de 1 minuto para iniciar.

### Dica

Caso tenha conflitos com portas já usadas. Use os comandos:

```bash
killall node # Parar qualquer aplicação node que esteja sendo executados na máquina!
docker stop $(docker ps -qa) # Para containers que estão sendo executados!
```

Caso esteja utilizando o windows faça:
```bash
netstat -ano|findstr "PID :3306" #retorna numero pid
taskkill /pid {numero da pid} /f #coloque o numero pid removendo os "{}"
```
