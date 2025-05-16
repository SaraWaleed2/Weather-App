import { Button, Container, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment/min/moment-with-locales';
moment.locale('ar');
import { useSelector, useDispatch } from 'react-redux'
import { changeResult, fetchApi } from "../features/weatherApiSlice";



export default function WeatherUI() {
    const isLoading = useSelector((state) => state.weather.isLoading)
    const temp = useSelector((state) => state.weather.weatherData);
    const [dataAndTime, setDataAndTime] = useState('');
    const [locale, setLocale] = useState('ar');
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch()

    function changeLang() {

        if (locale == "en") {
            setLocale("ar");
            i18n.changeLanguage("ar");
            moment.locale("ar");
        } else {
            setLocale("en");
            i18n.changeLanguage("en");
            moment.locale("en");
        }

        setDataAndTime(moment().format("dddd , MMMM Do YYYY, h:mm a"));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDataAndTime(moment().format('dddd , MMMM Do YYYY, h:mm a'));
        }, 1000);

        return () => clearInterval(interval);
    }, [locale]);

    useEffect(() => {
        console.log("*************************************************")
        dispatch(fetchApi())
    }, []);

    return (
        <Container maxWidth="sm">
            {/* Container */}
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >

                {
                    isLoading ? <CircularProgress style={{ color: "white" }} /> :

                        <>
                            {/* card */}
                            <div
                                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                style={{
                                    width: "100%",
                                    background: "rgb(28 52 91 / 36%)",
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "15px",
                                    boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
                                }}
                            >
                                {/* content */}
                                <div>
                                    {/* city & time */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "end",
                                            justifyContent: "start",
                                        }}
                                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                    >
                                        <Typography
                                            variant="h2"
                                            style={{
                                                marginRight: "20px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {t("Cairo")}
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            style={{ marginRight: "20px" }}
                                        >
                                            {dataAndTime}
                                        </Typography>
                                    </div>

                                    <hr />

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        {/* degree & description */}
                                        <div>
                                            {/* temp */}
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Typography
                                                    variant="h1"
                                                    style={{
                                                        textAlign: "right",
                                                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                                                    }}
                                                >
                                                    {temp.temp}°
                                                </Typography>

                                                {/* Weather Icon */}
                                                <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt="" />
                                            </div>
                                            <Typography variant="h6" style={{ margin: "10px 0" }}>
                                                {t(temp.description)}
                                            </Typography>

                                            {/* min & max */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h5>
                                                    {locale === "ar" ? "الصغرى" : "min"} :
                                                    <span style={{ unicodeBidi: "plaintext", margin: "0 10px", direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                                                        {temp.tempMin}°
                                                    </span>
                                                </h5>
                                                <h5 style={{ margin: "0px 5px" }}>|</h5>
                                                <h5>
                                                    {locale == "ar" ? "الكبرى" : "max"} :
                                                    <span style={{ unicodeBidi: "plaintext", margin: "0 10px", direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                                                        {temp.tempMax}°
                                                    </span>
                                                </h5>
                                            </div>
                                        </div>
                                        <CloudIcon
                                            style={{
                                                fontSize: "200px",
                                                color: "white",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                    marginTop: "20px",
                                }}
                            >
                                <Button style={{ color: "white" }} variant="text" onClick={changeLang}>
                                    {locale === 'en' ? 'Arabic' : 'انجليزى'}
                                </Button>
                            </div>
                        </>
                }

            </div>
        </Container>
    );
}