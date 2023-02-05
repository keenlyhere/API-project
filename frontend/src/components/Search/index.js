import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { loadSearch } from "../../store/searchReducer";
import { loadSpots } from "../../store/spotReducer";

export default function SearchBar({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState("");
    // const [ allFiltered, setAllFiltered ] = useState([])
    const [count, setCount] = useState(-1);
    // const [ selectedSuggestion, setSelectedSuggestion ] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const allSpots = useSelector((state) => state.spots.spots);
    const ulRef = useRef();


    useEffect(() => {
        dispatch(loadSpots());
    }, [dispatch]);

    const allFiltered = useMemo(() => {
        // console.log('query', query)
        const filteredSpots = Object.values(allSpots).filter(
            (spot) =>
                spot.city.toLowerCase().startsWith(query.toLowerCase()) ||
                spot.state.toLowerCase().startsWith(query.toLowerCase()) ||
                spot.country.toLowerCase().startsWith(query.toLowerCase())
        );
        // const filteredSpotsState = Object.values(allSpots).filter(spot => spot.state.toLowerCase().startsWith(query.toLowerCase()));
        // const filteredSpotsCountry = Object.values(allSpots).filter(spot => spot.country.toLowerCase().startsWith(query.toLowerCase()));

        const uniqueFilters = new Set();

        for (let spot of filteredSpots) {
            uniqueFilters.add(spot.city);
        }

        // for (let spot of filteredSpotsState) {
        //     uniqueFilters.add(spot.state);
        // }

        // for (let spot of filteredSpotsCountry) {
        //     uniqueFilters.add(spot.country);
        // }

        // console.log("FIRST", Array.from(uniqueFilters)[0])
        // console.log("FIRST", Array.from(uniqueFilters).length)

        const filteredArray = Array.from(uniqueFilters);

        return filteredArray;
    }, [allSpots, query]);

    // const selectedSuggestion = useMemo(() => allFiltered[count], [allFiltered, count])

    // const filteredSpots = useSelector(state => state.searches.suggestions);

    // useEffect(() => {
    //     // if (!showMenu) return;
    //     if (allFiltered.length === 0 || !query || (allFiltered.length === 1 && allFiltered[0] === query)) {
    //         setShowMenu(false);
    //         return;
    //     }
    //     setShowMenu(true);

    // }, [showMenu, allFiltered]);

    useEffect(() => {
        if (!showMenu) return;

        if (allFiltered.length === 0 || !query || (allFiltered.length === 1 && allFiltered[0] === query)) {
            setShowMenu(false);
            return;
        }

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu, allFiltered])

    // const closeMenu = () => setShowMenu(false);

    // useEffect(() => {
    //     setSelectedSuggestion(allFiltered[count]);
    // }, [count])

    // useEffect(() => {
    //     // console.log("QUERY!!", query)
    //     // console.log("LENGTH!!", query.length)
    //     if (query.length === 0 || !query) {
    //         setAllFiltered([])
    //         closeMenu();
    //     } else {

    //         const filteredSpotsCity = Object.values(allSpots).filter(spot => spot.city.toLowerCase().startsWith(query.toLowerCase()));
    //         const filteredSpotsState = Object.values(allSpots).filter(spot => spot.state.toLowerCase().startsWith(query.toLowerCase()));
    //         const filteredSpotsCountry = Object.values(allSpots).filter(spot => spot.country.toLowerCase().startsWith(query.toLowerCase()));

    //         const uniqueFilters = new Set();

    //         for (let spot of filteredSpotsCity) {
    //             uniqueFilters.add(spot.city);
    //         }

    //         for (let spot of filteredSpotsState) {
    //             uniqueFilters.add(spot.state);
    //         }

    //         for (let spot of filteredSpotsCountry) {
    //             uniqueFilters.add(spot.country);
    //         }

    //         // console.log("FIRST", Array.from(uniqueFilters)[0])
    //         // console.log("FIRST", Array.from(uniqueFilters).length)

    //         const filteredArray = Array.from(uniqueFilters);

    //         setAllFiltered(filteredArray);
    //         setShowMenu(true);

    //         // if (Array.from(uniqueFilters).length < 1 || !uniqueFilters) {
    //         //     closeMenu();
    //         // }

    //         // if (Array.from(uniqueFilters)[1] === query) {
    //         //     closeMenu();
    //         // }
    //     }

    // }, [query]);

    // console.log("selected", selectedSuggestion)
    // console.log("count", count);
    // console.log("allFiltered", allFiltered);

    const handleQueryInput = (e) => {
        // console.log("handle query input", e.target.value);
        setQuery(e.target.value);
        setCount(-1);
        // console.log("query after handleQueryInput", query);
        setShowMenu(true);
        // dispatch thunk action
        // const query = e.target.value
        // dispatch(actionLoadSearchSuggestions(query, allSpots))
    };

    const handleQueryClick = (spot) => {
        setQuery(spot);
        // setAllFiltered([]);
        // closeMenu();
    };

    const handleKeyDown = (e) => {
        // console.log("handle key down", count);
        // console.log(e.key)
        // console.log("e.keycode", e.keyCode);

        // if (e.KeyCode !== 38 || e.KeyCode !== 40 || e.KeyCode !== 13) {
        //     handleQueryInput(e);
        // }
        switch (e.keyCode) {
            // ArrowUp
            case 38:
                e.preventDefault();
                if (count === -1) return;
                // if (count === -1) {
                //     setCount(count);
                //     console.log("arrow up", count)
                //     setQuery(allFiltered[count])

                // } else {
                //     setCount(count--);
                // }
                // this.setState({ active: active < items.length ? ++active : active });
                // console.log("up arrow - initial count:", count)

                setCount(count - 1);
                // console.log("up arrow - set count:", count)
                // console.log("up arrow - all filtered:", allFiltered);
                // console.log("up arrow - suggestion:", selectedSuggestion)
                // setSelectedSuggestion(allFiltered[count])

                break;
            // ArrowDown
            case 40:
                e.preventDefault();
                // console.log("KEYDOWN");
                // console.log("allfiltered in count", count);
                // console.log("allfiltered in keydown", allFiltered);
                // console.log("count", count)
                if (count < allFiltered.length - 1) {
                    // console.log("should go here")
                    setCount(count + 1);
                    // console.log("new count", count);
                    // console.log("allfilt", allFiltered[count])
                    // setSelectedSuggestion(allFiltered[count]);
                    // console.log("selected", selectedSuggestion)
                }
                break;
            // Enter
            case 13:
                console.log("HIT 13");
                if (count > -1) {
                    setQuery(allFiltered[count]);
                    // console.log("query");
                }
                if (!showMenu) {
                    handleQuerySubmit(query);
                }
                break;
            default:
                break;
        }
        // if (e.keyCode === 38) {

        // } else if (e.keyCode === 40) {

        // } else if (e.keyCode === 13) {

        // } else {
        //     // console.log("handle query input", query)
        //     console.log("allFiltered else", allFiltered)
        //     // handleQueryInput();
        //     // handleQuerySubmit(query);
        // }

        // if (e.keyCode === 40) {
        //   //down
        //   this.setState({ active: active < items.length ? ++active : active });
        // } else if (e.keyCode === 38) {
        //   //up
        //   this.setState({ active: active === -1 ? active : --active });
        // } else if (e.keyCode === 13) {
        //   //enter
        //   if (this.state.active > -1) {
        //     this.selectSuggestion(active);
        //   }
        // } else {
        //   this.handleChange();
        // }
    };

    const handleQuerySubmit = (finalQuery) => {
        // console.log("handleQuerySubmit", finalQuery);
        const searchResults = dispatch(loadSearch(finalQuery))
            .then(setQuery(""))
            .then(history.push("/"))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    // console.log("ERRORS :C");
                    history.push("/no-spots");
                }
            });
        // setQuery("");
        // history.push(`/`)
    };

    // console.log("all filtered", allFiltered)

    // const suggestDropDownClass = "Navigation-search-bar-dropdown" + { showMenu ? "" : " hidden"}
    const suggestDropDownClass = "Navigation-search-bar-dropdown" + (showMenu ? "" : " hide");

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
                <input
                    className="Navigation-search-bar-input"
                    placeholder="Search by location"
                    value={query}
                    onChange={handleQueryInput}
                    onKeyDown={handleKeyDown}
                />
                <button className="Navigation-search-button" onClick={(e) => handleQuerySubmit(query)}>
                    <i className="fa-solid fa-magnifying-glass Navigation-search-icon"></i>
                </button>
            </div>
            { allFiltered &&
                <div
                    className={suggestDropDownClass}
                    onBlur={() => setShowMenu(false)}
                    ref={ulRef}
                >
                    <ul>
                        {   allFiltered.map((spot, idx) => (
                                <li
                                    key={idx}
                                    className={`Navigation-search-bar-suggestions {idx === count ? "red" : ""}`}
                                    style={{ color: idx === count ? "red" : "" }}
                                    onClick={() => handleQueryClick(spot)}
                                >
                                    {spot}
                                </li>
                            ))}
                    </ul>
                </div>
            }
        </div>
    );
}
