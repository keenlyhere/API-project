import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSearch } from "../../store/searchReducer";
import { loadSpots } from "../../store/spotReducer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
// import SearchIcon from "@mui/icons-material/Search";
// import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [ query, setQuery ] = useState("");
    const [ allFiltered, setAllFiltered ] = useState([])
    let [ count, setCount ] = useState(-1);
    const [ selectedSuggestion, setSelectedSuggestion ] = useState("");

    const allSpots = useSelector(state => state.spots.spots);
    // const filteredSpots = useSelector(state => state.searches.suggestions);

    const allCityStateCountrySet = new Set();

    for (let spot of Object.values(allSpots)) {
        const cityObj = {};
        const stateObj = {};
        const countryObj = {};
        cityObj.label = spot.city;
        stateObj.label = spot.state;
        countryObj.label = spot.country;
        // console.log("SPOT OBJ", cityObj)
        allCityStateCountrySet.add(cityObj);
        allCityStateCountrySet.add(stateObj);
        allCityStateCountrySet.add(countryObj);
    }

    const allCityStateCountry = Array.from(allCityStateCountrySet);

    useEffect(() => {
        dispatch(loadSpots());
    }, [dispatch]);

    useEffect(() => {
        if (query.length == 0) {
            setAllFiltered([])
            return;
        }

        const filteredSpotsCity = Object.values(allSpots).filter(spot => spot.city.toLowerCase().startsWith(query.toLowerCase()));

        const setToArr = Array.from(allCityStateCountrySet);


        const suggestions = setToArr.filter(spot => spot.label.toLowerCase().startsWith(query.toLowerCase()))

        setAllFiltered(suggestions)

    }, [query])

    const handleQuerySubmit = (finalQuery) => {
        dispatch(loadSearch(finalQuery));
        setQuery("");
        history.push(`/`);
    }

    return (
        // <div>
        //     <input id="search-bar" placeholder="Search by location" onChange={ e => handleQueryInput(e) } />
        //     { filteredSpots && filteredSpots.length > 0 && filteredSpots.map( (spot, idx) => (
        //         <div key={idx} onClick={() => handleQueryInput(spot)}>
        //             {spot}
        //         </div>
        //     ))}

        // </div>
        // <div className="Navigation-search-bar">
        //     <Autocomplete
        //         items={ allFiltered }
        //         shouldItemRender={(item, value) =>
        //             item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
        //         }
        //         getItemValue={(item) => item.label}
        //         renderItem={(item, isHighlighted) => (
        //             <div
        //             style={{
        //                 background: isHighlighted ? "#bcf5bc" : "white"
        //             }}
        //             key={item.id}
        //             >
        //             {item.label}
        //             </div>
        //         )}
        //         value={ query }
        //         onChange={(e) => setQuery(e.target.value)}
        //         onSelect={(val) => setQuery(val)}
        //         renderInput={(params) => (
        //             <TextField
        //             {...params}
        //             margin="normal"
        //             aria-label="enter search"
        //             name="search"
        //             placeholder="Search"
        //             value={query}
        //             InputProps={{
        //                 ...params.InputProps,
        //                 // startAdornment: <SearchIcon />,
        //                 type: "search"
        //             }}
        //             />
        //             // <div className="Navigation-search-bar-container">
        //             //     <input
        //             //         className="Navigation-search-bar-input"
        //             //         placeholder="Search by location"
        //             //     />
        //             //     <button className="Navigation-search-button" onClick={() => handleQuerySubmit(query)}>
        //             //         <i className="fa-solid fa-magnifying-glass Navigation-search-icon"></i>
        //             //     </button>
        //             // </div>
        //         )}
        //         // inputProps={{
        //         //     placeholder: "Where do you want to go?"
        //         // }}
        //     />
        // </div>




        <div className="Navigation-search-bar">
            <Autocomplete
                freeSolo
                options={allFiltered.map((option) => option.label)}
                onChange={(e) => setQuery(e.target.value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        margin="normal"
                        aria-label="enter search"
                        name="search"
                        placeholder="Search"
                        value={query}
                        InputProps={{
                            ...params.InputProps,
                            // startAdornment: <SearchIcon />,
                            type: "search"
                        }}
                    />
                )}
            />
        </div>
    )
}
