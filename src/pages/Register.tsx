import { Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../lang/i18n";


type InputTypes = {
    FirstName:string,
    LastName:string,
    Address: string,
    PhoneNumber:string,
    Email:string,
    Password:string

}

function Register() {
    const {t} = useTranslation();
    const registerSchema = zod.object({
        Email: zod.string().email(`${t("invalid_email")}`),
        Password: zod.string().min(8, `${t("invalid_password")}`),
        FirstName: zod.string().min(2, `${t("invalid_f_name")}`),
        LastName: zod.string().min(2, `${t("invalid_l_name")}`),
        PhoneNumber: zod.string().length(12, `${t("invalid_phone")}`),
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
                        <Typography variant="h2" textAlign={"center"}>{t("register")}</Typography>
                        <TextField {...register("FirstName")} helperText={errors.FirstName?.message} type="text" />
                        <TextField {...register("LastName")} helperText={errors.LastName?.message} type="text" />
                        <TextField {...register("Address")} helperText={errors.Address?.message} type="adress" />
                        <TextField {...register("PhoneNumber")} helperText={errors.PhoneNumber?.message} type="number" />
                        <TextField {...register("Email")} helperText={errors.Email?.message} type="email" />
                        <TextField {...register("Password")} helperText={errors.Password?.message} type="password" />
                        <Button variant="contained" disabled={!isValid} size="large" sx={{ alignSelf: "center" }} type="submit">{t("register")}</Button>
                        <Typography variant="body1" textAlign={"center"}>
                            {t("no_account")}<Link to="/login" underline="hover" component={RouterLink}>{t("login")}</Link>
                        </Typography>
                    </Stack>
                </form>
            </Container>
        </section>
    )
}

export default Register