import React from "react"
import axios from "axios"
import { FileUpload, NewsSlider } from "./components"

function App() {
	const [news, setNews] = React.useState([])
	React.useEffect(() => {
		if (!news.length) {
			axios
				.get(
					"https://newsapi.org/v2/everything?q=bitcoin&apiKey=59a6464fc207428ebe8a6bba18a4bddd",
				)
				.then(({ data }) => setNews(data.articles))
		}
	}, [])
	window.news = news
	return (
		<div className="App">
			<FileUpload />
			<h1>Новостной слайдер</h1>
			<div style={{ position: "relative" }}>
				<NewsSlider items={news} count={3} />
			</div>
		</div>
	)
}

export default App
