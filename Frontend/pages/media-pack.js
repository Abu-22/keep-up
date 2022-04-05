import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ReactPlayer from 'react-player/youtube';
import Cookies from "js-cookie";
import Head from "../components/Heads";
import Grid from "@material-ui/core/Grid";
import Layout from "../components/Layout";




export default function mediaPack() {
  
  const [mediapacks, setMediapacks] = useState({});
  const [suburb, setSuburb] = useState({});

  let api_url = `${process.env.NEXT_PUBLIC_API_KEY}/getMedia`; // to Filter by suburb possibility -> getMedia?suburb=${suburb}`;

    useEffect(() => {
      getMediaPacks(api_url);
      getSuburb();
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
 
  // Retrieve suburb chosen
 const getSuburb =() => {
  setSuburb(Cookies.get("suburb"));
  }


  
    // Display mediapack based on suburb chosen 
    if (suburb == "sandown"){
    return (
    <div>
      <Layout >
        <Card>
          <CardHeader
            title = {mediapacks.title}
            // subheader="03 April 2022" // Possibility to get metadata from mediapack API  
          />
      
          <Card style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 20,}}>
            <ReactPlayer playing = {false} url={mediapacks.link} />  
          </Card > 

          <CardContent style= {{border:'none'}}>
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
    else 
    { return (
      <div>
      <Head title={"Media Pack"} />
      <Layout>
        <Grid
          container
          spacing={0}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "text-align": "center",
            display: "block",
          }}
        >
          <h1 className="headings">COMING SOON</h1>
        </Grid>
      </Layout>
    </div>
    );}
  
}



