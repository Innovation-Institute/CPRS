FROM debian:sid
RUN apt-get -y update
RUN apt-get -y install curl
RUN curl -sL https://rpm.nodesource.com/setup_10.x
RUN apt-get -y install git nodejs npm
WORKDIR /root
RUN mkdir CPRS 
WORKDIR /root/CPRS
RUN git clone https://github.com/Innovation-Institute/CPRS.git
WORKDIR /root/CPRS/CPRS
RUN npm install
RUN npm install forever -g
RUN apt-get install redis-server -y
#RUN redis-server --port 7379 --daemonize yes
#EXPOSE 7379
ENV AIRTABLE_API_KEY AIRTABLE_API_KEY_VALUE
ENV AIRTABLE_BASE AIRTABLE_BASE_VALUE
ENV EMAIL_ACCOUNT EMAIL_ACCOUNT_VALUE
ENV EMAIL_PASSWORD EMAIL_PASSWORD_VALUE
CMD redis-server --port 7379 --daemonize yes && forever bin/www 
