import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useState } from "react";
import { AuthControllerApi } from "../../generated/index";
import { FichierResponse, SignInRequest, UserRequest } from "../../generated/models";
import environment from "../environments/environment";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    user: {
      id: number | null;
      username: string | null;
      email: string | null;
      dateNaiss: Date | null;
      password: string | null;
      role: string | null;
      profile: FichierResponse | null;
    } | null;
  };
  onRegister?: (
    username: string,
    email: string,
    dateNaiss: Date,
    password: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN = "TOKEN";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    user: {
      id: number | null;
      username: string | null;
      email: string | null;
      dateNaiss: Date | null;
      password: string | null;
      role: string | null;
      //profile: string | null;
    } | null;
  }>({
    token: null,
    authenticated: null,
    user: null,
  });

  const register = async (
    username: string,
    email: string,
    dateNaiss: Date,
    password: string
  ) => {
    const authApi = new AuthControllerApi(environment);

    const apiParams: UserRequest = {
      username: username,
      password: password,
      email: email,
      dateNaiss: dateNaiss,
    };

    try {
      const response = await authApi.register(apiParams);
      console.log(response.data.email);
      return { success: true };
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        return {
          success: false,
          error: "Nom d'utilisateur ou email existant.",
        };
      }
      return { success: false, error: error.message };
    }
  };

  const login = async (username: string, password: string) => {
    const authApi = new AuthControllerApi(environment);
    const apiParams: SignInRequest = {
      username: username,
      password: password,
    };

    console.log(apiParams);

    try {
      const response = await authApi.login(apiParams);
      const user = response?.data?.user;

      setAuthState({
        token: response?.data?.token!,
        authenticated: true,
        user: {
          id: user?.id!,
          username: user?.username!,
          email: user?.email!,
          dateNaiss: user?.dateNaiss!,
          password: user?.password!,
          role: user?.role?.nom!,
          //profile: user?.profile!,
        },
      });

      const currentTime = new Date().toISOString();
      await SecureStore.setItemAsync("TIME", currentTime);
      await SecureStore.setItemAsync(TOKEN, response?.data?.token!);

      console.log(user);
      return { success: true, user: user };
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403) {
        return {
          success: false,
          error: "Nom d'utilisateur ou Mot de passe incorrect.",
        };
      }
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    let token: string | null = await SecureStore.getItemAsync(TOKEN);
    if (token == null) {
      token = "";
    } else {
      setAuthState({
        token: "",
        authenticated: false,
        user: null,
      });

      await SecureStore.deleteItemAsync(TOKEN);
      alert("Vous avez ete deconnecte");
    }
  };

  const value: AuthProps = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
