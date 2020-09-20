FROM ubuntu

RUN apt-get update && apt-get install -y curl

WORKDIR /usr/src/

COPY . .

RUN chmod +x startup.sh

CMD [ "./startup.sh" ]