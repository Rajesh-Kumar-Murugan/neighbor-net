import {
    Container,
    Paper,
    TextInput,
    Button,
    Title,
    Tabs,
    Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

type LoginValues = {
    email: string;
};

type SignupValues = {
    name: string;
    email: string;
    community: string;
};

export default function Authentication() {

    const { login } = useAuth();
    const navigate = useNavigate();

    // Login form
    const loginForm = useForm<LoginValues>({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email address",
        },
    });

    // Signup form
    const signupForm = useForm<SignupValues>({
        initialValues: {
            name: "",
            email: "",
            community: "",
        },
        validate: {
            name: (value) =>
                value.trim().length > 1 ? null : "Name is required",
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email address",
            community: (value) =>
                value.trim().length > 1 ? null : "Community name is required",
        },
    });

    const handleLogin = (values: { email: string }) => {
        console.log("Login", values.email);
        login();
        navigate("/home");
    };

    const handleSignup = (values: { name: string; email: string; community: string }) => {
        console.log("Signup", values);
        login();
        navigate("/home");
    };

    return (
        <Container size={420} my={80}>
            <Title ta="center" mb="lg">
                Neighbor Net
            </Title>

            <Paper withBorder shadow="md" p="lg" radius="md">
                <Tabs defaultValue="login">
                    <Tabs.List grow>
                        <Tabs.Tab value="login">Login</Tabs.Tab>
                        <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
                    </Tabs.List>

                    {/* LOGIN */}
                    <Tabs.Panel value="login" pt="md">
                        <form
                            onSubmit={loginForm.onSubmit(handleLogin)}
                        >
                            <Stack>
                                <TextInput
                                    label="Email"
                                    placeholder="you@community.com"
                                    required
                                    {...loginForm.getInputProps("email")}
                                />

                                <Button type="submit" fullWidth>
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Tabs.Panel>

                    {/* SIGN UP */}
                    <Tabs.Panel value="signup" pt="md">
                        <form
                            onSubmit={signupForm.onSubmit(handleSignup)}
                        >
                            <Stack>
                                <TextInput
                                    label="Name"
                                    placeholder="Your full name"
                                    required
                                    {...signupForm.getInputProps("name")}
                                />

                                <TextInput
                                    label="Email"
                                    placeholder="you@community.com"
                                    required
                                    {...signupForm.getInputProps("email")}
                                />

                                <TextInput
                                    label="Community Name"
                                    placeholder="Neighborhood / Apartment name"
                                    required
                                    {...signupForm.getInputProps("community")}
                                />

                                <Button type="submit" fullWidth>
                                    Sign Up
                                </Button>
                            </Stack>
                        </form>
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </Container>
    );
}
