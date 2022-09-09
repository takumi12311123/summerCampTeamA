FROM node:14.4.0-buster

WORKDIR /summerCampTeamA

COPY / /summerCampTeamA/.
COPY package-lock.json .

RUN npm ci 

CMD ["node"]