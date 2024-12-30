import Button from "../../ui/button/button.tsx";
import moonIcon from "../../../assets/images/icon-moon.svg"
import sunIcon from "../../../assets/images/icon-sun.svg"
import {useEffect} from "react";
import Icon from "../../ui/icon/Icon.tsx";
import "./toggletheme.styles.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/useRedux.ts";
import {themeSelector, toggleTheme} from "../../../features/theme/theme.slice.ts";

const ToggleTheme = () => {
    const {theme} = useAppSelector(themeSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <Button onClick={() => dispatch(toggleTheme())} className={"theme"}>
            <Icon icon={theme === "light" ? sunIcon : moonIcon} description={"theme icon"}/>
        </Button>
    )
}

export default ToggleTheme