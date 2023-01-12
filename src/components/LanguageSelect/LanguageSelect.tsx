import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export function LanguageSelect() {
    const { t, i18n } = useTranslation();

    function handleLanguageSelect(evt: any) {
        if (evt.target.value === "") return
        i18n.changeLanguage(evt.target.value);
    }
    return <FormControl sx={{ maxWidth:"10rem", marginLeft:"auto", marginBlock:"1rem" }} fullWidth>
        <InputLabel id="languageSelect">{t("choose_lang")}</InputLabel>
        <Select
            autoWidth
            variant="outlined"
            labelId="languageSelect"
            value={i18n.language}
            label="Language"
            onChange={handleLanguageSelect}
            className="select"
        >
            <MenuItem value={'uz'}>O'zbekcha</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'ru'}>русский</MenuItem>
            <MenuItem value={'kr'}>кириллча</MenuItem>
        </Select>
    </FormControl>
}
