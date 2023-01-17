import { Button, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "../lang/i18n";
import { useTranslation } from "react-i18next";
import { loginUser } from "../API/api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

type InputTypes = {
    email: string,
    password: string
}

function Login() {
    const { setToken, token } = useContext(AuthContext);
    const failLogin = (msg: string) => toast.error(msg);
    const loginSchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8, "Your password should contain at least 8 characters")
    });
    const navigate = useNavigate();
    const { register, formState: { errors, isValid }, handleSubmit } = useForm<InputTypes>({
        mode: "all",
        resolver: zodResolver(loginSchema)
    });
    const { t } = useTranslation()
    const handleLogin: SubmitHandler<InputTypes> = async (data) => {
        try {
            const newFormData = new FormData();
            Object.entries(data).forEach(item => {
                newFormData.append(`${item[0]}`, item[1]);
            })
            const loginData = await loginUser(newFormData);
            localStorage.setItem("token", JSON.stringify(loginData.data.token));
            setToken(loginData.data.token);
            navigate("/");
        } catch (error: any) {
            failLogin(error?.response?.data?.Message);
        }
    };
    return (
        <section className="login-section">
            <Container>
                <form className="login-form" autoComplete="off" onSubmit={handleSubmit(handleLogin)} action="#">
                    <Stack sx={{ paddingBlock: "3rem", maxWidth: "450px", marginInline: "auto" }} spacing={4}>
                        <Typography variant="h2" textAlign={"center"}>{t("login")}</Typography>
                        <TextField {...register("email")} helperText={errors.email?.message} type="email" />
                        <TextField {...register("password")} helperText={errors.password?.message} type="password" />
                        <Button variant="contained" disabled={!isValid} size="large" sx={{ alignSelf: "center" }} type="submit">{t("login")}
                        </Button>
                        <Typography variant="body1" textAlign={"center"}>
                            {t("already_has_account")} <Link to="/register" underline="hover" component={RouterLink}>{t("register")}</Link>
                        </Typography>
                    </Stack>
                </form>
                <ToastContainer />
            </Container>
        </section>
    )
}

export default Login