import {useContext, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AppContext } from '../context/AppContext';
import { toTitleCase, sortAlpha } from '../helpers';

export default function FilterBooks(props) {
  const {bookSubs} = useContext(AppContext)
  const [filterValues, setFilterValues] = useState([]);

  const handleChange = (value) => {
    const currentIndex = filterValues.indexOf(value)
    const newFilterValues = [...filterValues]
    if(currentIndex === -1){
      newFilterValues.push(value)
    }else{
      newFilterValues.splice(currentIndex, 1)
    }
    setFilterValues(newFilterValues)
    props.handleFilters(newFilterValues)
  };

  return (
    <FormControl>
      <FormLabel id="subject-filter">Filter Subject</FormLabel>
      <FormGroup
        aria-labelledby="subject-filter"
        name="subject-filter"
      >
        {[...bookSubs].map(sub => (
        <FormControlLabel 
          key={sub} 
          control={<Checkbox 
            onChange={()=>handleChange(sub)} 
            checked={filterValues.indexOf(sub) === -1 ? false : true} 
            name={sub}/>} 
          label={toTitleCase(sub)}
        />
        ))}
      </FormGroup>
    </FormControl>
  );
}
