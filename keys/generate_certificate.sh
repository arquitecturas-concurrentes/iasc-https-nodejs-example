#!/bin/bash
clear

# CA Key and Certificate
openssl genrsa -aes256 -out ca.key 4096
openssl req -new -x509 -days 365 -key ca.key -out ca.crt

# Create the Server Key CSR and Certificate
openssl genrsa -aes256 -out server.key 4096
openssl req -new -key server.key -out server.csr

# Self Signing
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

# Create the Client Key and CSR
openssl genrsa -aes256 -out test.key 4096
openssl req -new -key test.key -out test.csr

# Sign client certificate
openssl x509 -req -days 365 -in test.csr -CA ca.crt -CAkey ca.key -set_serial 02 -out test.crt

# Pack client key and certificate to be used in browsers
openssl pkcs12 -export -clcerts -in test.crt -inkey test.key -out test.p12

# Remove password from server key
openssl rsa -in server.key -out server.key.nopwd && mv server.key.nopwd server.key
