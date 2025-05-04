import { Button, Container, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
moment.locale('ar');

export default function WeatherUI() {
    const [temp, setTemp] = useState({ temp: 0, tempMin: 0, tempMax: 0, description: '', icon: '' });
    const [dataAndTime, setDataAndTime] = useState('');
    const { t, i18n } = useTranslation();
    const [locale, setLocale] = useState('ar');

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
        i18n.changeLanguage(locale);
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=9140be087a4dd0c71785c85aa94a6dfa')
            .then(function (response) {
                console.log(response.data);
                let tempMin = response.data.main.temp_min;
                let tempMax = response.data.main.temp_max;
                let description = response.data.weather[0].description;
                let icon = response.data.weather[0].icon;
                const resTemp = Math.round(response.data.main.temp - 273.15);
                setTemp({
                    temp: resTemp,
                    tempMin: Math.round(tempMin - 273.15),
                    tempMax: Math.round(tempMax - 273.15),
                    description: description,
                    icon: icon
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <Container maxWidth="sm">
            {/* CONTENT CONTAINER */}
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                {/* CARD */}
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
                    {/* CONTENT */}
                    <div>
                        {/* CITY & TIME */}
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
                        {/* == CITY & TIME == */}

                        <hr />

                        {/* CONTAINER OF DEGREE + CLOUD ICON */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            {/* DEGREE & DESCRIPTION */}
                            <div>
                                {/* TEMP */}
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
                                {/*== TEMP ==*/}

                                <Typography variant="h6" style={{ margin: "10px 0" }}>
                                    {t(temp.description)}
                                </Typography>

                                {/* MIN & MAX */}
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
                                        {locale === "ar" ? "الكبرى" : "max"} :
                                        <span style={{ unicodeBidi: "plaintext", margin: "0 10px", direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                                            {temp.tempMax}°
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            {/*== DEGREE & DESCRIPTION ==*/}

                            <CloudIcon
                                style={{
                                    fontSize: "200px",
                                    color: "white",
                                }}
                            />
                        </div>
                        {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
                    </div>
                    {/* == CONTENT == */}
                </div>
                {/*== CARD ==*/}

                {/* TRANSLATION CONTAINER */}
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
                        {locale === 'en' ? 'Arabic' : 'English'}
                    </Button>
                </div>
                {/*== TRANSLATION CONTAINER ==*/}
            </div>
            {/*== CONTENT CONTAINER ==*/}
        </Container>
    );
}