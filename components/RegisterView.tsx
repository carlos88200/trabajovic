import { FormControl, Text, Image, FormControlLabel, Button, ButtonText, FormControlLabelText, Input, InputField } from '@gluestack-ui/themed';
import { Box, VStack } from '@gluestack-ui/themed';


const RegisterView = () => {
    return <Box maxWidth="100%" width={"$full"} height="$1/3" borderRadius="$sm">
        <Image size="md" width={"$full"} height={"$full"} alt="login_image" source={require("/assets/pantalla_inicio.png")} resizeMode="cover" style={{
            alignSelf: "center"
        }} />
        <Text ml={"$5"} fontWeight='$bold' fontSize={"$2xl"} my={"$3"} borderBottomColor='black'>Register</Text>
        <VStack>
            <FormControl size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>Username</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} borderBottomColor={"$black"} borderRadius="$sm">
                    <InputField type="password" defaultValue="" placeholder="Username" />
                </Input>
            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>last name</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} borderBottomColor={"$black"}>
                    <InputField type="text" defaultValue="" placeholder="last name" />
                </Input>
            </FormControl>

            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>number control</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} marginTop={"$0"} borderBottomColor={"$black"} borderRadius={"$sm"}>
                    <InputField type="text" defaultValue="" placeholder="control number" />
                </Input>
            </FormControl>


            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>Phone number</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} marginTop={"$0"} borderBottomColor={"$black"} borderRadius={"$sm"}>
                    <InputField type="text" defaultValue="" placeholder="Phone number" />
                </Input>
            </FormControl>


            <FormControl isInvalid={false} size={"md"} isDisabled={false} isRequired={false}>
                <FormControlLabel>
                    <FormControlLabelText color="black" ml="$5" fontSize={"$sm"} fontWeight='$bold'>Email</FormControlLabelText>
                </FormControlLabel>
                <Input width={"$3/4"} borderRadius={"$sm"} mx={"$auto"} marginBottom={"$1"} borderBottomColor={"$black"} borderRadius="$sm">
                    <InputField type="text" defaultValue="" placeholder="Email" />
                </Input>
            </FormControl>

        </VStack>
        <Button action={"primary"} backgroundColor={"#FFA600"} mt={"$5"} size={"lg"} mx={"$auto"} width={"$3/4"} borderRadius={"$lg"} mt={"$2"} isDisabled={false} sx={{
            ':hover': {
                backgroundColor: '#c4871d'
            }
        }}>
            <ButtonText>
                Login
            </ButtonText>

        </Button>
    </Box>;
};
export default RegisterView;