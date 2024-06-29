import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Button,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../screens/Profile/ProfileStyle";

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  username: string;
  email: string;
  dob: Date;
  setEmail: (email: string) => void;
  setDob: (date: Date) => void;
  errorMessage: { email: string | null };
  setErrorMessage: (error: { email: string | null }) => void;
  message: string;
  messageType: string;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  handleDateChange: (event: any, selectedDate: Date | undefined) => void;
  maxDate: Date;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  onClose,
  onSave,
  username,
  email,
  dob,
  setEmail,
  setDob,
  errorMessage,
  setErrorMessage,
  message,
  messageType,
  showDatePicker,
  setShowDatePicker,
  handleDateChange,
  maxDate,
}) => {
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <Text style={styles.modalText}>Edit Profile</Text>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            editable={false}
          />
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {errorMessage.email && (
            <Text style={styles.errorMessage}>{errorMessage.email}</Text>
          )}
          <Text style={styles.inputLabel}>Date of birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.input}>{formatDate(dob)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={maxDate}
            />
          )}
          {messageType === "error" && (
            <Text style={styles.errorMessage}>{message}</Text>
          )}
          <View style={styles.modalButtonContainer}>
            <Button title="Save" onPress={onSave} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ProfileModal;
