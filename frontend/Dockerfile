FROM node:alpine3.18
WORKDIR /app
COPY . ./app 
RUN yarn
#RUN npm install -g npm@10.5.2
RUN yarn add expo@latest
# RUN npm install -g expo-cli
RUN yarn global add expo-cli
RUN npx expo install react-native-web react-dom @expo/metro-runtime
RUN npm install punycode --save
RUN npm install metro-cache --save
RUN node --trace-deprecation
EXPOSE 8081
ENTRYPOINT ["npx", "expo", "start"]