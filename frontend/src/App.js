import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import LinkEnter from './components/LinkEnterComponent';
import ProcessStatusBar from './components/ProcessStatusBarComponent';
import ResultList from './components/ResultListComponent';
import { videos } from './redux/selectors';

function App() {

  const videoList = useSelector(videos)

  return (
    <div className="App align-items-center">
      <Header/>
      <LinkEnter/>
      {videoList.length === 0 && <ProcessStatusBar/>}
      {videoList.length > 0 && <ResultList items={videoList}/>}
    </div>
  );
}

export default App;
