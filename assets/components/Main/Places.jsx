import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxList,
    ComboboxOption,
    ComboboxInput,
    ComboboxPopover
} from "@reach/combobox";

function Place({ setPlace , field, setDestination, setDestinationName }) {
    const {ready, value, setValue, suggestions: { status, data }, clearSuggestions} = usePlacesAutocomplete();
    
    const onSelect = async (val) => {
        setValue(val, false);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);

        if (field === 'from') {
            setPlace({ lat, lng });
        }

         setDestination({lat, lng}, );
         setDestinationName(val);
    }

    return (
        <Combobox onSelect={onSelect}>
            <ComboboxInput className="combInput" value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} placeholder="Search location" />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && 
                        data.map(({place_id, description}) => (
                                <ComboboxOption className='combOption' key={place_id} value={description}></ComboboxOption>
                            ))
                        }

                </ComboboxList>
            </ComboboxPopover>
        </Combobox>   
    )
}

export default Place;