import { Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../lang/i18n";
import { registerUser } from "../API/api";
import { ToastContainer, toast } from "react-toastify";

type InputTypes = {
    FirstName: string,
    LastName: string,
    Address: string,
    PhoneNumber: string,
    Email: string,
    Password: string

}

function Register() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const failRegister = (msg: string) => toast.error(msg);
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
    const handleRegister: SubmitHandler<InputTypes> = async (data) => {
        try {
            const newFormData = new FormData();
            Object.entries(data).forEach(item => {
                newFormData.append(`${item[0]}`, item[1]);
                console.log(`${item[0]}`, item[1]);
            });
            const registerInfo = await registerUser(newFormData);
            console.log(registerInfo);
            if (registerInfo.status === 200) {
                navigate("/login");
            }

        } catch (error: any) {
            failRegister(error?.response?.data?.Message);
        }
    };
    return (
        <section className="login-section">
            <Container>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit(handleRegister)} action="#">
                    <Stack sx={{ paddingBlock: "3rem", maxWidth: "450px", marginInline: "auto" }} spacing={4}>
                        <Typography variant="h2" textAlign={"center"}>{t("register")}</Typography>
                        <TextField {...register("FirstName")} placeholder="your firstname" helperText={errors.FirstName?.message} type="text" />
                        <TextField {...register("LastName")} placeholder="your lastname" helperText={errors.LastName?.message} type="text" />
                        <TextField {...register("Address")} placeholder="your address" helperText={errors.Address?.message} type="adress" />
                        <TextField {...register("PhoneNumber")} placeholder="your phone number" helperText={errors.PhoneNumber?.message} type="number" />
                        <TextField {...register("Email")} placeholder="your email" helperText={errors.Email?.message} type="email" />
                        <TextField {...register("Password")} placeholder="your password" helperText={errors.Password?.message} type="password" />
                        <Button variant="contained" disabled={!isValid} size="large" sx={{ alignSelf: "center" }} type="submit">{t("register")}</Button>
                        <Typography variant="body1" textAlign={"center"}>
                            {t("no_account")}<Link to="/login" underline="hover" component={RouterLink}>{t("login")}</Link>
                        </Typography>
                    </Stack>
                </form>
                <ToastContainer  />
            </Container>
        </section>
    )
}

export default Register