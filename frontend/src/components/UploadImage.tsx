import * as React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import * as ImagePicker from "expo-image-picker";

interface UploadimageProps {
    onImagePicked: (image: ImagePicker.ImagePickerResult) => void;
}

const Uploadimage = (props: UploadimageProps) => {
    const [image, setImage] = React.useState<string | null>(null);
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                // console.log("Image uploaded: ", result);
                setImage(result.assets[0].uri);
                props.onImagePicked(result);
                // console.log("Image: ", image);
            }
        } catch (E) {
            console.log(E);
        }
    }

    return (
        <View>
            <TouchableOpacity
                className='h-48 w-full justify-center items-center flex-1'
                onPress={() => pickImage()}
            >
                {image ? (
                    <ImageBackground
                        source={{ uri: image }}
                        className='z-50 w-full h-full'
                    />
                ) : (
                    <Text className='text-gray-400'>Cliquer ici</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default Uploadimage;
