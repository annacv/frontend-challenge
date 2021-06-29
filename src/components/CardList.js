import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const CardList = (props) => {
	const { data } = props;

	const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(data.length);
	const [touchPosition, setTouchPosition] = useState(null);

	useEffect(() => {
		setLength(data.length)
	}, [data])

	const next = () => {
		if (currentIndex < length) {
			setCurrentIndex(prevState => prevState + 1)
		}
	}

	const prev = () => {
		if (currentIndex > 0) {
				setCurrentIndex(prevState => prevState - 1)
		}
	}

	const handleTouchStart = (e) => {
		const touchDown = e.touches[0].clientX
		setTouchPosition(touchDown)
	}

	const handleTouchMove = (e) => {
		const touchDown = touchPosition
		const currentTouch = e.touches[0].clientX
		const diff = touchDown - currentTouch
		
		if(touchDown === null) { return }
		if (diff > 5) { next() }
		if (diff < -5) { prev() }

		setTouchPosition(null)
	}

	return (
		<div className="card-list" data={data}>
				<div className="card-list__section">
					<h2 className="card-list__section-title">{props.section}</h2>
					<div className="card-list__section-separator"></div>
					<Button ariaLabel="Go back icon" icon="FaChevronLeft" className={currentIndex > 0 ? 'btn__left' : 'btn__left--disabled'} onClick={prev}/>
					<Button ariaLabel="Go ahead icon" icon="FaChevronRight" className={ currentIndex < length ? 'btn__right' : 'btn__right--disabled'} onClick={next}/>
				</div>
				<div
					className="card-list__carousel-wrapper"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
				>
					<div
						className="card-list__items" 
						style={{ transform: `translateX(-${currentIndex * 100 }%)` }}
					>
						{data.map((item, i) => {
							console.log(item)
							if (!item.url) {
								return (
									<Card 
										key={i} 
										actions={props.actions} 
										id={item.id} 
										title={item.name} 
										subtitle={item.artists} 
										image={item.image}
									/>
								);
							} else {
								return (
									<a 
										key={i} 
										aria-label={`opens Spotify ${item.name} page in another tab`} 
										rel="noreferrer" 
										target='_blank' 
										href={item.url ? item.url.spotify : item.href}
									>
										<Card 
											actions={props.actions} 
											id={item.id} 
											title={item.name} 
											subtitle={item.artists} 
											image={item.image}
										/>
									</a>
								);
							}
						})}
					</div>
				</div>
		</div>
	);
}

export default CardList;
