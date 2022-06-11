import React, {useContext, useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import AddRemoveListBook from './AddRemoveListBook';
import ChangeBookQty from './ChangeBookQty';
import { AppContext } from '../../context/AppContext';
import { CardActionArea, Grid } from '@mui/material';
import { toTitleCase } from '../../helpers';
import {useNavigate} from 'react-router-dom'

export default function ListBook({book}) {
  const {readingList} = useContext(AppContext)
  const navigate = useNavigate()

  const [qty, setQty] = useState(readingList.filter((listBook)=>listBook.title === book.title).length)

  useEffect(
      ()=>{
          setQty(readingList.filter((listBook)=>listBook.title === book.title).length)
      },
      [readingList, book]
  )

  return (
    <Card sx={{display:'flex', width:'50%', margin:'auto', p:1, mb:2}}>
      <CardActionArea sx={{width:'20%'}} onClick={()=>{navigate('/book/'+book.id)}}>
        <CardMedia
          component="img"
          sx={{height:'20vh', objectFit:'contain', m:0}}
          image={book.img}
          alt={`Book cover for ${book.title}`}
          />
      </CardActionArea>
      <CardContent sx={{width:'80%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <CardActionArea onClick={()=>{navigate('/book/'+book.id)}}>
          <Typography variant="h5" textAlign='center'>
            {toTitleCase(book.title)}
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign='center'>
            By: {book.author}
          </Typography>
        </CardActionArea>
        <CardActions sx={{p:0, mt:1, justifyContent:'center'}} disableSpacing>
          <AddRemoveListBook book={book}/>
        </CardActions>
      </CardContent>
    </Card>
  );
}
