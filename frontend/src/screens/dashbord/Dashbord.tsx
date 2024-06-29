import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { styled, useColorScheme, withExpoSnack } from "nativewind";
import {
  default as React,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  AlertOptions,
  BackHandler,
  Dimensions,
  DrawerLayoutAndroid,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import { useAuth } from "../../context/AuthContext";
import Courses from "../courses/Courses";
import Home from "../home/Home";
import LastExam from "../lastExam/LastExam";
import Quiz from "../quiz/Quiz";
import DashbordStyle from "./DashbordStyle";
import environment from "@/environments/environment";
import { ImageBackground } from "react-native";

declare interface CustomAlertOptions extends AlertOptions {
  alertContainerStyle?: ViewStyle;
}

interface MenuItem {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const Dashbord = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const { authState } = useAuth();
  console.log("userName", authState?.user?.username);
  console.log("initialLetter", authState!.user!.username!.charAt(0));

  const navigationState = useNavigationState((state) => state);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        createTwoButtonAlertQuit();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const createTwoButtonAlertQuit = () =>
    Alert.alert(
      "Confirmer la sortie",
      "Êtes-vous sûr de vouloir quitter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "OUI",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {
        alertContainerStyle: DashbordStyle.alertContainer,
      } as CustomAlertOptions
    );

  useEffect(() => {
    console.log("Route change detected:", navigationState);
    drawer.current?.closeDrawer();
  }, [navigationState]);

  const drawer = useRef<DrawerLayoutAndroid>(null);
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const StyledIonicons = styled(Ionicons);
  const StyledText = styled(Text);
  const StyledDrawerLayoutAndroid = styled(DrawerLayoutAndroid);

  const [selectedCategory, setSelectedCategory] = useState("Home");

  const renderSelectedOption = () => {
    switch (selectedCategory) {
      case "Courses":
        return "Liste des cours";
      case "Quiz":
        return "Liste des Quiz";
      case "LastExam":
        return "Anciens Sujets";
      default:
        return "Accueil";
    }
  };

  const renderSelectedPage = () => {
    console.log(`Selected category: ${selectedCategory}`);
    switch (selectedCategory) {
      case "Courses":
        return <Courses />;
      case "Quiz":
        return <Quiz />;
      case "LastExam":
        return <LastExam />;
      default:
        return <Home />;
    }
  };

  const { onLogout } = useAuth();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirmer la déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "OUI",
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              console.error("onLogout function is not defined");
            }
          },
        },
      ],
      {
        alertContainerStyle: DashbordStyle.alertContainer,
      } as CustomAlertOptions
    );

  const menuItems: MenuItem[] = [
    { title: "Profil", iconName: "person" },
    { title: "Examen Blanc", iconName: "document-text" },
    { title: "Statistiques", iconName: "stats-chart" },
    { title: "A Propos", iconName: "information-circle" },
    { title: "Deconnexion", iconName: "log-out" },
    {
      title: "Theme",
      iconName: colorScheme === "dark" ? "moon" : "sunny-outline",
    },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState({
    title: "Home",
    iconName: "home",
  });

  const handleMenuItemClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    drawer.current?.closeDrawer();
    switch (menuItem.title) {
      case "Deconnexion":
        createTwoButtonAlert();
        break;
      case "Profil":
        navigation.navigate("Profile");
        break;
      case "Statistiques":
        navigation.navigate("Statistiques");
        break;
      case "Examen Blanc":
        navigation.navigate("ExamenBlanc");
        break;
      case "A Propos":
        navigation.navigate("AboutUs");
        break;
      case "Theme":
        toggleColorScheme();
      default:
        break;
    }
  };

  const goToProfilePage = () => {
    navigation.navigate("Profile");
  };

  const navigationView = () => (
    <View style={[DashbordStyle.container, DashbordStyle.navigationContainer]}>
      <View style={DashbordStyle.navigationHeader}>
        <View style={DashbordStyle.userInfoContainer}>
          <View style={DashbordStyle.initialLetterContainer}>
            <Pressable onPress={goToProfilePage}>
              {authState?.user?.profile ?
                <ImageBackground
                  source={{ uri: `${environment.basePath}/files/${authState.user.profile.id}` }}
                // className="z-50 bg-cover"
                // style={DashbordStyle.initialLetter}
                />
                : <Text style={DashbordStyle.initialLetter}>
                  {authState!.user!.username!.charAt(0)}
                </Text>}
            </Pressable>
          </View>
          <View>
            <Text style={DashbordStyle.userName}>
              {authState?.user?.username}
            </Text>
            <Text style={DashbordStyle.userRole}>{authState?.user?.role}</Text>
            <View style={DashbordStyle.line}></View>
            <Text style={DashbordStyle.textLeft}>Camer</Text>
            <Text style={DashbordStyle.textRight}>Drive</Text>
          </View>
        </View>
      </View>
      <ScrollView className="dark:bg-slate-600 pt-5">
        {menuItems.map((menuItem) => (
          <TouchableOpacity
            key={menuItem.title}
            style={[
              DashbordStyle.menuItem,
              DashbordStyle.menuItemContainer,
              selectedMenuItem.title === menuItem.title &&
              DashbordStyle.selectedMenuItem,
            ]}
            onPress={() => handleMenuItemClick(menuItem)}
          >
            <View style={DashbordStyle.menuItemIconContainer}>
              <StyledIonicons
                name={menuItem.iconName}
                size={24}
                className="text-cyan-950 dark:text-cyan-50"
              />
            </View>
            <StyledText
              className="text-cyan-950 dark:text-cyan-50 font-semibold"
              style={DashbordStyle.menuItemText}
            >
              {menuItem.title}
            </StyledText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <StyledDrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <View
        className="bg-slate-50 dark:bg-slate-800 border-b-slate-300 dark:border-b-slate-900"
        style={DashbordStyle.header}
      >
        <TouchableOpacity
          onPress={() => drawer.current?.openDrawer()}
          className="dark:text-slate-50"
        >
          <StyledIonicons
            name="menu"
            size={24}
            className="dark:text-slate-50"
          />
        </TouchableOpacity>

        <Text
          className="dark:text-slate-200"
          style={{ marginLeft: marginLeft }}
        >
          {renderSelectedOption()}
        </Text>
      </View>
      <View>{renderSelectedPage()}</View>
      <View
        className="dark:bg-slate-700"
        style={DashbordStyle.bottomNavigation}
      >
        <BottomNavigation
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
        />
      </View>
    </StyledDrawerLayoutAndroid>
  );
};

export default withExpoSnack(Dashbord);
