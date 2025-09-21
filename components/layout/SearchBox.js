
export default function SearchBox({ isSearch, handleSearch }) {
	return (
		<>
			<div id="popup-search-box">
				<div className="box-inner-wrap d-flex align-items-center">
					<form id="form" action="#" method="get" role="search">
						<input id="popup-search" type="text" name="s" placeholder="Type keywords here..." />
						<button id="popup-search-button" type="submit" name="submit">
							<i className="las la-search" />
						</button>
					</form>
					<div className="search-close" onClick={handleSearch}><i className="las la-times" /></div>
				</div>
			</div>
		</>
	)
}
