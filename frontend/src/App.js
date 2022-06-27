import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import LinkEnter from './components/LinkEnterComponent';
import ProcessStatusBar from './components/ProcessStatusBarComponent';
import ResultList from './components/ResultListComponent';
import ReviewItem from './components/ReviewItemComponent';
import {videoInfo, videos} from './redux/selectors';
import ServerConnector from "./middleware/ServerConnector";

function App() {

  const videoList = useSelector(videos)
  const videoInfoList = useSelector(videoInfo)

  useEffect(() => {
    ServerConnector.establishConnection()
  },[])

  const [reviewMode, setReviewMode] = useState(false)
  const [reviewItemId, setReviewItemId] = useState(null)

  const resultListOnClickHandler = (id) => {
    if(videoInfoList[id] !== undefined && videoInfoList[id] !== null){
      setReviewItemId(id)
      setReviewMode(true)
    }
  }

  const reviewItemOnCancelClick = () => {
    setReviewItemId(null)
    setReviewMode(false)
  }

  const reviewItemOnConfirmClick = () => {
    setReviewItemId(null)
    setReviewMode(false)
    //TODO
  }

  return (
    <div className="App align-items-center">
      <Header/>
      {!reviewMode                         && <LinkEnter/>}
      {videoList.length === 0              && <ProcessStatusBar/>}
      {videoList.length > 0 && !reviewMode && <ResultList onClick={resultListOnClickHandler}/>}
      {videoList.length > 0 && reviewMode  && <ReviewItem id={reviewItemId} onConfirmClick={reviewItemOnConfirmClick} onCancelClick={reviewItemOnCancelClick}/>}
    </div>
  );
}

export default App;
