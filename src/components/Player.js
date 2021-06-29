const Player = (props) => {
	const {data} = props;
	return (
		<div className="player" data={data}>
			{data}
			{data.map((item, i) => {
					return <iframe
							key={i}
							allow="encrypted-media"
							className="player__iframe" 
							same-site="None; Secure"
							title={item.name} 
							src={`https://open.spotify.com/embed?uri=${item.uri}`}
							width="auto" 
							height="77" 
							frameBorder="0" 
							allowtransparency="true"
						>
					</iframe>
				})}
		</div>
	);
}

export default Player
