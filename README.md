# Full Stack Question and Answer App

Full Stack app to create questions and answers.

## How to use?

The file `docker-compose.yml` defines that when the container initialize the command `npm run dev` will run. To use, simply execute:

```bash
docker-compose up -d
```

### Where to access
```bash
# After initialized the containers go to:
http://localhost:3001
```
### Important
Mysql could take more than 1 minute to start in your machine. The app may take more than 1 minute to start.

### Tip

In case of port conflicts, use the following commands:

```bash
killall node
docker stop $(docker ps -qa)
```

Caso esteja utilizando o windows faça:
```bash
netstat -ano|findstr "PID :3306" #retorna numero pid
taskkill /pid {numero da pid} /f #coloque o numero pid removendo os "{}"
```
