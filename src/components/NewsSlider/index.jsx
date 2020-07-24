import React from "react"
import debounce from "lodash/debounce"
import PropTypes from "prop-types"

import "./style.scss"

const NewsSlider = ({ items, count }) => {
	const [maxCount, setMaxCount] = React.useState(count)
	const wrappContainer = React.useRef(null)
	const onScroll = React.useCallback(
		debounce((e) => {
			if (e.target) {
				const isEnd =
					e.target.scrollWidth - e.target.scrollLeft - 250 <=
					e.target.clientWidth
				if (isEnd) {
					setMaxCount((counts) => counts + 1)
				}
			}
		}, 50),
		[],
	)
	React.useEffect(() => {
		if (wrappContainer.current && maxCount >= items.length) {
			wrappContainer.current.removeEventListener("scroll", onScroll)
		}
	}, [maxCount, onScroll])
	React.useEffect(() => {
		const { current } = wrappContainer
		current.addEventListener("scroll", onScroll)
		return () => {
			current.removeEventListener("scroll", onScroll)
		}
	}, [onScroll])
	return (
		<div className="sliderContent" ref={wrappContainer}>
			{items &&
				items.slice(0, maxCount).map((item, id) => (
					<div className="sliderContentBox" key={id}>
						<img src={item.urlToImage} alt={item.title} />
						<div className="infoContent">
							<p className="infoContent__title">{item.title}</p>
							<p className="infoContent__desc">{item.description}</p>
							<p className="infoContent__publish">
								{new Date(item.publishedAt).toLocaleString()}
							</p>
						</div>
					</div>
				))}
		</div>
	)
}

NewsSlider.propTypes = {
	items: PropTypes.array.isRequired,
	count: PropTypes.number.isRequired,
}

export default NewsSlider
