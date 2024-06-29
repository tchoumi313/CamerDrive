import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
    apiKey: '',
    username: '',
    password: '',
    accessToken: '',
    basePath: Platform.OS === "android" ? 'http://10.0.2.2:8080' : 'http://localhost:8080/api'
};

export default devConfig;
