### PRD DEPLOYMENT

docker build -t cv-manager-backend-prd .
docker run -d -p 8082:8080 --env-file .env --add-host host.docker.internal:host-gateway cv-manager-backend-prd
