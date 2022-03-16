import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import styled from 'styled-components';
import { IoSearch,IoClose } from "react-icons/io5";
import {motion, AnimatePresence} from "framer-motion";
import {useClickOutside} from "react-click-outside-hook";
import MoonLoader from 'react-spinners/MoonLoader';
import { useDebounce } from "./hooks/debounceHook";
import axios from "axios";
import { PlayList } from "./playLists";

const SearchBarContainer = styled(motion.div)`
  margin-left: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 96%;
  height: 2.5em;
  background-color: #424242;
  border-radius: 3px;
  
`;

const SearchInputContainer = styled.div`
  width: 98%;
  min-height: 2.5em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 300;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #white;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 14px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 15px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "26em",
  },
  collapsed: {
    height: "2.5em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [myPayLists, setmyPayLists] = useState([]);
  const [nomyPayLists, setNomyPayLists] = useState(false);
  
  
  const isEmpty = !myPayLists || myPayLists.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNomyPayLists(false);

    setSearchQuery(e.target.value);
  };
  

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setNomyPayLists(false);
    setmyPayLists([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  

  const searchPlayList = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    setNomyPayLists(false);

    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: {q: searchQuery},
      headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '6a99d5e101msh1e9f2b2f948746fp1ae1f3jsn6b458fe8b4e4'
      }
    };
    
    axios.request(options).then(function (response) {
      
      if (response) {
        
        if (response.data && response.data.length === 0) setNomyPayLists(true);
        
        setmyPayLists(response.data.data);
      }
    }).catch(function (error) {
      console.error(error);
    });

    

    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchPlayList);
  return (
    
    <div className="my__search">
    <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder="Search"
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color="#000" size={20} />
            </LoadingWrapper>
          )}
          {!isLoading && isEmpty && !nomyPayLists && (
            <LoadingWrapper>
              <WarningMessage>Start typing to Search</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && nomyPayLists && (
            <LoadingWrapper>
              <WarningMessage>No PlayList Found! </WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && !isEmpty && (
            <>
              {myPayLists.map((playlist) => (
                <PlayList
                  key={playlist.id}
                  thumbnailSrc={playlist.album.cover_medium}
                  name={playlist.title_short}
                  artist={playlist.artist.name}
                />
              ))}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>
    </div>
  );
}

export default SearchBar;
