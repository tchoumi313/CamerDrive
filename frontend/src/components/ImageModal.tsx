// ImageModal.tsx
import React, { useState } from 'react';
import { View, Modal, Image, Button, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import environment from '@/environments/environment';
import { UserResponse } from 'generated';

interface ImageModalProps {
    modalVisible: boolean,
    handleCloseModal: () => void,
    imageUri: string | null,
}

const ImageModal: React.FC<ImageModalProps> = (props) => {
    const { authState } = useAuth();
    const [image, setImage] = useState<string>("")
    const [picked, setPicked] = useState<boolean>(false);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setPicked(true);
                // console.log("Image: ", image);
            }
        } catch (E) {
            console.log(E);
        }
    }
    const handleCloseModal = () => {
        props.handleCloseModal();
        setImage("");
        setPicked(false);
    }

    const handleModifyProfile = async () => {
        const formData = new FormData();

        formData.append("profile", {
            uri: image,
            type: "image/jpeg",
            name: `${authState?.user?.username}.jpg`,
        } as unknown as Blob);

        await axios.put(
            `${environment.basePath}/users/profile/${authState?.user?.id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authState?.token}`,
                },
            }
        ).then((response) => {
            console.log("Profile Modifie avec succes !!!\n")
            const newUser: UserResponse = response.data;
            authState!.user!.profile = newUser.profile!;
            console.log(response.data);
            props.handleCloseModal();
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={props.handleCloseModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Pressable onPress={handleCloseModal} className='mb-5'>
                        <AntDesign name='close' size={30} color={"red"} />
                    </Pressable>
                    {image ?
                        <Image source={{ uri: image }} style={styles.modalImage} />
                        : props.imageUri ? <Image source={{ uri: props.imageUri! }} style={styles.modalImage} />
                            : <View className='w-20 h-30 border-2 border-emerald-600 justify-center items-center bg-green-800'>
                                <Text>{authState?.user?.username?.charAt(0)}</Text>
                            </View>}

                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => pickImage()} className='justify-center items-center rounded-full bg-gray-600 h-10 w-10'>
                            <AntDesign name="edit" size={30} color="white" />
                        </Pressable>
                        {picked &&
                            <Pressable onPress={handleModifyProfile} className='justify-center items-center rounded-full bg-gray-600 h-10 w-10'>
                                <AntDesign name="save" size={30} color="white" />
                            </Pressable>}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: Dimensions.get("window").width * 0.95,
        padding: 20,
        backgroundColor: 'rgb(90, 90, 90)',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
});

export default ImageModal;
