sudo docker stop

sudo docker rm $(sudo docker ps -a -f status=exited -q)

sudo docker build -t oxigeno-api-image .

sudo docker run  -d --restart always -p 5000:5000 --name fundacion-oxigeno-api oxigeno-api-image