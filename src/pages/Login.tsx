import { Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import {Link} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


type InputTypes = {
    email: string,
    password: string
}

function Login() {
    const loginSchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8, "Your password should contain at least 8 characters")
    });
    const { register, formState: { errors, isValid }, handleSubmit } = useForm<InputTypes>({
        mode: "all",
        resolver: zodResolver(loginSchema)
    });
    const handleLogin: SubmitHandler<InputTypes> = data => console.log(data);
    return (
        <section className="login-section">
            <Container>
                <form className="login-form" autoComplete="off" onSubmit={handleSubmit(handleLogin)} action="#">
                    <Stack sx={{ paddingBlock: "3rem", maxWidth:"450px", marginInline:"auto"}} spacing={4}>
                        <Typography variant="h2" textAlign={"center"}>Login</Typography>
                        <TextField {...register("email")} helperText={errors.email?.message} type="email" />
                        <TextField {...register("password")} helperText={errors.password?.message} type="password" />
                        <Button variant="contained" disabled={!isValid} size="large" sx={{alignSelf:"center"}} type="submit">Login</Button>
                        <Typography variant="body1" textAlign={"center"}>
                            Already have an account? <Link to="/register" underline="hover" component={RouterLink}>Sign up</Link>
                        </Typography>
                    </Stack>
                </form>
            </Container>
        </section>
    )
}

export default Login