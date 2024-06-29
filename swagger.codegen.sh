
cd ressources/api/swagger/
#java -jar swagger-codegen-cli-3.0.46.jar generate -i https://013f-129-0-103-71.ngrok-free.app/v3/api-docs -l typescript-axios -o ../../../frontend/generated
java -jar swagger-codegen-cli-3.0.46.jar generate -i http://localhost:8080/v3/api-docs -l typescript-axios -o ../../../frontend/generated
# java -jar swagger-codegen-cli-3.0.46.jar generate -i ../../../src/backend/target/swagger-ui/api-docs.yaml -l typescript-axios -o ../../../src/frontend/generated

#Remplcer la sous chaine ./dist par ./
file="package.json"
search="./dist/"
replace="./"

cd ../../../frontend/generated/
sed -i 's/"main": "\.\/dist\/index\.js"/"main": "\.\/index\.js"/g' $file
sed -i 's/"typings": "\.\/dist\/index\.d\.ts"/"typings": "\.\/index\.d\.ts"/g' $file

echo "./dist supprime avec succes"
