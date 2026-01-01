import { Box, Group, Button, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        if (isLoggedIn) logout();
        navigate("/");
    };

    return (
        <Box component="header" px="md">
            <Group justify="space-between" align="center" wrap="nowrap">
                {/* Left */}
                <Group gap="xs" wrap="nowrap">
                    <Image src="/logo.png" alt="Neighbor Net" h={75} w="auto" />
                    <Text
                        fw={700}
                        size="xl"
                        lh={1}
                        style={{ whiteSpace: "nowrap" }}
                    >
                        Neighbor Net
                    </Text>
                </Group>

                {/* Right */}
                <Button variant="outline" onClick={handleClick}>
                    {isLoggedIn ? "Log Out" : "Log In"}
                </Button>
            </Group>
        </Box>
    );
}
