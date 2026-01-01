import { Box, Group, Button, Image, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        if (isLoggedIn) {
            logout();
        }
        navigate("/")
    };

    return (
        <Grid align="center">
            <Grid.Col span={3}>
                <Image src="/logo.png" alt="Neighbor Net" h={75} w={130} />
            </Grid.Col>

            <Grid.Col span={6}>
                <Box fw="bolder" component="h2">
                    Neighbor Net
                </Box>
            </Grid.Col>

            <Grid.Col span={3}>
                <Group justify="flex-end" align="center">
                    <Button variant="outline" size="md" onClick={handleClick}>
                        {isLoggedIn ? "Log Out" : "Log In"}
                    </Button>
                </Group>
            </Grid.Col>
        </Grid>
    );
}
