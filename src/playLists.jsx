import React, { useState } from "react";
import styled from "styled-components";

const PlaylistContainer = styled.div`
  width: 96%%;
  min-height: 3em;
  display: flex;
  border-bottom: 2px solid #555555;
    align-items: center;
`;

const Image = styled.div`
  width: auto;
  height: 80%;
  display: flex;
  flex: 0.4;
  img {
    border-radius: 20px;
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 12px;
  color: white;
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Artist = styled.span`
  margin-top: 10px;
  font-size: 8px;
  color: white;
  
  display: flex;
  align-items: center;
`;

export function PlayList(props) {
  const { thumbnailSrc, name, artist } = props;
  


  return (
    
    <PlaylistContainer>
      <Image>
        <img src={thumbnailSrc} />
      </Image>
      <Name>{name}
      <Artist>
        {artist}
      </Artist> 
      </Name>
      </PlaylistContainer>
  );
}