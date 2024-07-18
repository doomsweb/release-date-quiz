import React, {useState, useEffect} from "react"
import axios from "axios"
import { classNames } from "@/utils/helpers"
import Lottie from 'lottie-react';
import {VideoCameraIcon} from '@heroicons/react/20/solid';

import rightIcon from '../../lotties/right.json';
import wrongIcon from '../../lotties/wrong.json';
import gameOverIcon from '../../lotties/gameover.json';

const top500Ids = ["tt0111161","tt0068646","tt0468569","tt0071562","tt0050083","tt0108052","tt0167260","tt0110912","tt0120737","tt0060196","tt0109830","tt0167261","tt0137523","tt1375666","tt0080684","tt0133093","tt0099685","tt0073486","tt0114369","tt0816692","tt0038650","tt0047478","tt0102926","tt0120815","tt0317248","tt0118799","tt0120689","tt0103064","tt0076759","tt0088763","tt0245429","tt0253474","tt6751668","tt0054215","tt0172495","tt15239678","tt0110357","tt9362722","tt0407887","tt0110413","tt0120586","tt2582802","tt0482571","tt0095327","tt0056058","tt0114814","tt0034583","tt1675434","tt0095765","tt0027977","tt0047396","tt0064116","tt0078748","tt0021749","tt1853728","tt0078788","tt0209144","tt0910970","tt0082971","tt23849204","tt0405094","tt0043014","tt4154756","tt0050825","tt4633694","tt0051201","tt0081505","tt0032553","tt0090605","tt0361748","tt1345836","tt2380307","tt0057012","tt0086879","tt0364569","tt0169547","tt0114709","tt4154796","tt0082096","tt0112573","tt0119217","tt0119698","tt7286456","tt5311514","tt0057565","tt1187043","tt0087843","tt0045152","tt8267604","tt0091251","tt0180093","tt0435761","tt0086190","tt0338013","tt2106476","tt0062622","tt0105236","tt0044741","tt0056172","tt0053604","tt15398776","tt1255953","tt0053125","tt0033467","tt0086250","tt0022100","tt0036775","tt0052357","tt0093058","tt0211915","tt0113277","tt1049413","tt0066921","tt0056592","tt1832382","tt0070735","tt0097576","tt0095016","tt0986264","tt0017136","tt0208092","tt8579674","tt0119488","tt0040522","tt8503618"]

export function Home() {
    const [movie, setMovie] = useState(null)
    const [lives, setLives] = useState(3)
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState(null)
    const [years, setYears] = useState(null)
    const [correct, setCorrect] = useState(0)
    const [hightScore, setHighscore] = useState(localStorage.getItem("highscore") || 0)
    const [loading, setLoading] = useState(true)

    const getRandomEntry = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const getMovie = () => {
        const randomId = getRandomEntry(top500Ids)
        axios.get(`${import.meta.env.VITE_OMDB_API_URL}/?i=${randomId}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`).then((response) => {
            setMovie({
                title: response.data.Title,
                year: response.data.Year,
                poster: response.data.Poster,
            })
            const firstYear = addRandomNumberPlus(parseInt(response.data.Year));
            const secondYear = addRandomNumberMinus(parseInt(response.data.Year));
            const realYear = parseInt(response.data.Year);
            const allYears = [firstYear, secondYear, realYear];
            setYears(shuffleArray(allYears))
            setLoading(false)
        })
    }


    useEffect(() => {
        if(lives === 0) {
            if(localStorage.getItem("highscore")) {
                if(correct > localStorage.getItem("highscore")) {
                    localStorage.setItem("highscore", correct)
                    setHighscore(correct)
                }
            } else {
                localStorage.setItem("highscore", correct)
                setHighscore(correct)
            }
        }
    }, [lives])

    useEffect(() => {
        getMovie()
    }, [])

    const handleClick = (year) => {
        if (year === parseInt(movie.year)) {
            setResult(true)
            setShowResult(true)
            setCorrect(correct + 1)
        } else {
            setResult(false)
            setShowResult(true)
            setLives(lives - 1)
        }
    }


    const addRandomNumberPlus = (baseNumber) => {
        const randomAdd = Math.floor(Math.random() * 7) + 1; // Zufällige Zahl zwischen 1 und 7
        return baseNumber + randomAdd;
    }
    const addRandomNumberMinus = (baseNumber) => {
        const randomAdd = Math.floor(Math.random() * 7) + 1; // Zufällige Zahl zwischen 1 und 7
        return baseNumber - randomAdd;
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const gernerateButtons = (year) => {
        const plusYear = addRandomNumberPlus(parseInt(year));
        const minusYear = addRandomNumberMinus(parseInt(year));
        const allYears = [year, plusYear, minusYear];
        const shuffledYears = shuffleArray(allYears);
        return (
            <div className="flex flex-row gap-4">
                {years?.map((randomYear) => (
                    <button 
                        key={randomYear}
                        type="button"
                        className="rounded-md bg-indigo-600 px-6 py-4 text-2xl font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => handleClick(randomYear)}
                    >
                        {randomYear}
                    </button>
                ))}
            </div>
        )
    }
    
    return (
        <React.Fragment>
            <div className="h-screen flex justify-center items-center w-full overflow-hidden">
                <div className="fixed top-0 left-0 flex gap-5 m-5">
                    <span className="text-2xl">Dein Highscore: {hightScore}</span>
                </div>
                {lives === 0 && (
                    <div className="fixed flex flex-col justify-center w-96 shadow-md rounded-md bg-white/95 text-black">
                        <Lottie
                            className="h-60"
                            animationData={gameOverIcon}
                            options={
                                {
                                    loop: true,
                                    autoplay: true,
                                    animationData: gameOverIcon,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                    }
                                }
                            }
                        />
                        <span className="text-2xl text-center">Du hast leider keine Leben mehr übrig :(</span>
                        <span className="text-2xl font-bold text-center mt-2">Punktzahl: {correct}</span>
                        <button
                            className="rounded-md m-4 bg-indigo-600 px-4 py-3 text-xl font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {setLives(3); setShowResult(null); setResult(null); setLoading(true); getMovie(); setCorrect(0)}}
                        >
                            Neues Spiel
                        </button>

                    </div>

                )}
                {lives > 0 && showResult && (
                    <div className="fixed flex flex-col justify-center w-96 shadow-md rounded-md bg-white/95 text-black">
                        <Lottie
                            className="h-60"
                            animationData={result ? rightIcon : wrongIcon}
                            options={
                                {
                                    loop: true,
                                    autoplay: true,
                                    animationData: result ? rightIcon : wrongIcon,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                    }
                                }
                            }
                        />
                        <span className="text-2xl text-center">{result ? "Das war richtig!" : `Schade, die richtige Antwort wäre ${movie.year} gewesen.`}</span>
                        <button
                            className="rounded-md m-4 bg-indigo-600 px-4 py-3 text-xl font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {setShowResult(false); setLoading(true); getMovie();}}
                        >
                            Nächster Film
                        </button>
                    </div>
                )}
                <div className="fixed top-0 right-0 flex gap-5 m-5">
                    {lives === 3 && (
                        <div className="flex justify-center items-center gap-2">
                            <span>Leben:</span>
                            <VideoCameraIcon className="h-16 text-red-600 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 bg-gray-800 p-3 rounded-full" />
                        </div>
                    )}
                    {lives === 2 && (
                        <div className="flex justify-center items-center gap-2">
                            <span>Leben:</span>
                            <VideoCameraIcon className="h-16 text-red-600 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 opacity-40 bg-gray-800 p-3 rounded-full" />
                        </div>
                    )}
                    {lives === 1 && (
                        <div className="flex justify-center items-center gap-2">
                            <span>Leben:</span>
                            <VideoCameraIcon className="h-16 text-red-600 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 opacity-40 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 opacity-40 bg-gray-800 p-3 rounded-full" />
                        </div>
                    )}
                    {lives === 0 && (
                        <div className="flex justify-center items-center gap-2">
                            <span>Leben:</span>
                            <VideoCameraIcon className="h-16 text-red-600 opacity-40 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 opacity-40 bg-gray-800 p-3 rounded-full" />
                            <VideoCameraIcon className="h-16 text-red-600 opacity-40 bg-gray-800 p-3 rounded-full" />
                        </div>
                    )}
                </div>
                {loading && (
                    <div className="flex flex-col gap-2 justify-center items-center mt-10">
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary"
                            role="status">
                        </div>
                    </div>
                )}
                {!loading && (
                    <div className="w-full flex flex-col gap-4 justify-center items-center">
                        <div className="text-2xl">In welchem Jahr wurde <span className="font-bold">{movie?.title}</span> veröffentlicht?</div>
                        <img className="border-4 border-white rounded-md shadow-2xl h-[500px] min-h-[500px]" src={movie?.poster} alt={movie?.title} />
                        <div>{gernerateButtons(movie?.year)}</div>
                    </div>
                )}
                <div className="fixed left-4 bottom-4 text-white opacity-50">
                    <span className="mb-4">Aufgabe 3 - Mini Hackathon - doomsweb</span>
                </div>
                <div className="fixed right-4 bottom-4 text-white opacity-50">
                    <span className="mb-4">Foto von <a href="https://unsplash.com/de/@felixmooneeram?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Felix Mooneeram</a> auf <a href="https://unsplash.com/de/fotos/red-cinema-chair-evlkOfkQ5rE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></span>
                </div>
            </div>
        </React.Fragment>
    )
}
