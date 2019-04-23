# CPRS Dockerfile

Dockerfile to run the CPRS application.

## Requirements

Docker ( Tested on Docker - version 18.09.1 )

## Steps

* Enter the values for the below terms in the docker file:
  * AIRTABLE_API_KEY_VALUE
  * AIRTABLE_BASE_VALUE
  * EMAIL_ACCOUNT_VALUE
  * EMAIL_PASSWORD_VALUE

* Build the docker image:
  * docker build -t cprs .

* Run the docker image/Create the container:
  * docker run -tid -p 80:8800 cprs
  
* The application should be successfully running on port 80. (Make sure no other application is using port 80)
