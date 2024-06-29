import { Ionicons } from "@expo/vector-icons";

export interface Task {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

const tasks: Task[] = [
  { icon: "help-circle-outline", text: "Gestion des questions" },
  { icon: "clipboard-outline", text: "Gestion des quiz" },
  { icon: "archive-outline", text: "Gestion des anciens sujets" },
  { icon: "people-outline", text: "Gestion des utilisateurs" },
  { icon: "school-outline", text: "Gestion des cours" },
  { icon: "book-outline", text: "Gestion des concepts" },
   /*{ icon: "checkmark-circle-outline", text: "Gestion des tests" },*/
];

export default tasks;
