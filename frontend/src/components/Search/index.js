import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSearch } from "../../store/searchReducer";
import { loadSpots } from "../../store/spotReducer";

export default function SearchBar({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [ query, setQuery ] = useState("");
    const [ allFiltered, setAllFiltered ] = useState([])

    const allSpots = useSelector(state => state.spots.spots);
    // const filteredSpots = useSelector(state => state.searches.suggestions);


    useEffect(() => {
        dispatch(loadSpots());
    }, [dispatch]);

    useEffect(() => {
        console.log("QUERY!!", query)
        console.log("LENGTH!!", query.length)
        if (query.length == 0) {
            setAllFiltered([])
            return;
        }

        const filteredSpotsCity = Object.values(allSpots).filter(spot => spot.city.toLowerCase().startsWith(query));
        const filteredSpotsState = Object.values(allSpots).filter(spot => spot.state.toLowerCase().startsWith(query));
        const filteredSpotsCountry = Object.values(allSpots).filter(spot => spot.country.toLowerCase().startsWith(query));

        const uniqueFilters = new Set()

        for (let spot of filteredSpotsCity) {
            uniqueFilters.add(spot.city);
        }

        for (let spot of filteredSpotsState) {
            uniqueFilters.add(spot.state);
        }

        for (let spot of filteredSpotsCountry) {
            uniqueFilters.add(spot.country);
        }

        setAllFiltered(Array.from(uniqueFilters))

    }, [query])

    const handleQueryInput = (e) => {
        console.log("handle query input", e.target.value)
        setQuery(e.target.value)
        // dispatch thunk action
        // const query = e.target.value
        // dispatch(actionLoadSearchSuggestions(query, allSpots))
    }

    const handleQueryClick = (spot) => {
        setQuery(spot)
    }

    const handleQuerySubmit = (finalQuery) => {
        console.log("handleQuerySubmit", finalQuery)
        dispatch(loadSearch(finalQuery));
        setQuery("");
        history.push(`/`)
    }

    console.log("all filtered", allFiltered)

    return (
        // <div>
        //     <input id="search-bar" placeholder="Search by location" onChange={ e => handleQueryInput(e) } />
        //     { filteredSpots && filteredSpots.length > 0 && filteredSpots.map( (spot, idx) => (
        //         <div key={idx} onClick={() => handleQueryInput(spot)}>
        //             {spot}
        //         </div>
        //     ))}

        // </div>
        <div className="Navigation-search-bar">
            <div className="Navigation-search-bar-container">
                <input className="Navigation-search-bar-input" placeholder="Search by location" value={query} onChange={handleQueryInput} />
                <button className="Navigation-search-button" onClick={() => handleQuerySubmit(query)}>
                    <i className="fa-solid fa-magnifying-glass Navigation-search-icon"></i>
                </button>
            </div>
            <div className="Navigation-search-bar-dropdown">
                { allFiltered && allFiltered.length > 0 && allFiltered.map( (spot, idx) => (
                    <div
                        key={idx}
                        className="Navigation-search-bar-suggestions"
                        onClick={() => handleQueryClick(spot)}>
                        {spot}
                    </div>
                ))}
            </div>

        </div>
    )
}
