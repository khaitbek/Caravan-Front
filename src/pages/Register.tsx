import { Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


type InputTypes = {
    FirstName:string,
    LastName:string,
    Address: string,
    PhoneNumber:string,
    Email:string,
    Password:string

}

function Register() {
    const registerSchema = zod.object({
        Email: zod.string().email(),
        Password: zod.string().min(8, "Your password should contain at least 8 characters"),
        FirstName:zod.string().min(2, "Your first name must have at least 2 characters"),
        LastName: zod.string().min(2, "Your last name must have at least 2 characters"),
        PhoneNumber: zod.string().length(12,"Invalid phone number"),
        Address: zod.string().optional(),
    });
    const { register, formState: { errors, isValid }, handleSubmit } = useForm<InputTypes>({
        mode: "all",
        resolver: zodResolver(registerSchema)
    });
    const handleRegister: SubmitHandler<InputTypes> = data => console.log(data);
    return (
        <section className="login-section">
            <Container>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit(handleRegister)} action="#">
                    <Stack sx={{ paddingBlock: "3rem", maxWidth: "450px", marginInline: "auto" }} spacing={4}>
                        <Typography variant="h2" textAlign={"center"}>Register</Typography>
                        <TextField {...register("FirstName")} helperText={errors.FirstName?.message} type="text" />
                        <TextField {...register("LastName")} helperText={errors.LastName?.message} type="text" />
                        <TextField {...register("Address")} helperText={errors.Address?.message} type="adress" />
                        <TextField {...register("PhoneNumber")} helperText={errors.PhoneNumber?.message} type="number" />
                        <TextField {...register("Email")} helperText={errors.Email?.message} type="email" />
                        <TextField {...register("Password")} helperText={errors.Password?.message} type="password" />
                        <Button variant="contained" disabled={!isValid} size="large" sx={{ alignSelf: "center" }} type="submit">Register</Button>
                        <Typography variant="body1" textAlign={"center"}>
                            Don't have an account? <Link to="/login" underline="hover" component={RouterLink}>Log in</Link>
                        </Typography>
                    </Stack>
                </form>
            </Container>
        </section>
    )
}

export default Register