#!/bin/bash

# Change directory to the swagger resources
cd ressources/api/swagger/

# Generate TypeScript Axios client using Swagger Codegen CLI
java -jar swagger-codegen-cli-3.0.46.jar generate -i http://localhost:8080/api/v3/api-docs -l typescript-axios -o../../../frontend/generated

# Navigate to the generated frontend directory
cd../../../frontend/generated/

# Replace './dist' with './' in package.json
file="package.json"
search="./dist/"
replace="./"

# Use sed to replace the paths in package.json
sed -i "s/$search/$replace/g" $file

# Confirm the replacement was successful
echo "./dist supprime avec succes"

