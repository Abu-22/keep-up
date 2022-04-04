import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ReactPlayer from 'react-player/youtube';




export default function mediaPack() {
  
  const [mediapacks, setMediapacks] = useState({});
  let api_url = `${process.env.NEXT_PUBLIC_API_KEY}/getMedia`; // to Filter by suburb possible usecase -> getMedia?suburb=${suburb}`;

    useEffect(() => {
      getMediaPacks(api_url);;
    }, [mediapacks.id]);


  // API call to get mediapack details.
  const getMediaPacks = (api_url) => {
    fetch(api_url)
      .then((response) => response.json())
      .then((json) => {
      setMediapacks(json[0])})
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
  };
  

  return (
    <div>
      <Layout >
        <Card>
          <CardHeader
            title = {mediapacks.title}
            subheader="03 April 2022" // Possible to get metadata from mediapack details 
          />
      
          <Card style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 20,}}>
            <ReactPlayer playing = {false} url={mediapacks.link} />  
          </Card > 

          <CardContent style= {{border:'none'}}>
            <Typography>
               Description: 
            </Typography>

            <Typography>
              {mediapacks.description}
            </Typography>
          </CardContent>


          <CardActions >
            <IconButton aria-label="share">
              <ShareIcon/>
            </IconButton>
          </CardActions>
        </Card>
      </Layout>
    </div>
  
  );
}



