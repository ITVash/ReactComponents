import React from "react"
//import PropTypes from "prop-types"

import "./style.scss"

const FileUpload = (props) => {
	const [file, setFile] = React.useState([])
	const [prev, setPrev] = React.useState([])
	const addFiles = (e) => {
		const upp = document.querySelector(".filesBlock__items ul")
		const files = e.target.files
		let readers = new FileReader()
		for (let i = 0; i < files.length; i++) {
			const item = files[i]
			readers.readAsDataURL(item)
			const type = item.type.match("image.*") ? "image" : "video"
			setFile(file.concat(item))
			readers.addEventListener("load", () => {
				switch (type) {
					case "imagez":
						return (upp.innerHTML = `<li>
								<img src=${readers.result} alt='image' />
							</li>`)
					case "image":
						return setPrev(
							prev.concat({
								type: "image",
								name: item.name,
								link: readers.result,
							}),
						)
					case "video":
						return "video"
					default:
						break
				}
			})
		}
	}

	window.files = file
	return (
		<div className='filesBlock'>
			<div className={`filesBlock__items`}>
				<ul>
					{prev.length > 0 ? (
						prev.map((item, index) => (
							<li key={index}>
								{item.type === "image" ? (
									<>
										<img src={item.link} alt={item.name} />
										<span>
											<p>удалить</p>
										</span>
									</>
								) : (
									"а вот это видео"
								)}
							</li>
						))
					) : (
						<li>файлы не добавленны</li>
					)}
				</ul>
			</div>
			<div className={`filesBlock__input`}>
				<input
					type='file'
					name='file'
					id='file'
					onChange={addFiles}
					accept='image/*,video/*'
					/* multiple */
				/>
				<label htmlFor='file'>
					<svg
						className='filesBlock__input_icon'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
					>
						<path d='M286 384h-80c-14.2 1-23-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c11.6 11.6 3.7 33.1-13.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-23-23V366c0-13.3 10.7-24 24-24h136v8c0 31 24.3 56 56 56h80c30.9 0 55-26.1 57-55v-8h135c13.3 0 24 10.6 24 24zm-124 88c0-11-9-20-19-20s-19 9-20 20 9 19 20 20 21-9 20-20zm64 0c0-12-9-20-20-20s-20 9-19 20 9 20 20 20 21-9 20-20z'></path>
					</svg>
					<br />
					Загрузите файл!
				</label>
			</div>
		</div>
	)
}

/* FileUpload.propTypes = {} */

export default FileUpload
