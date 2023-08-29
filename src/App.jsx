import styled from 'styled-components'
import { useState, useEffect } from 'react'
// import './App.css'

function App() {

  const [storyDetails, setStoryDetails] = useState([])
  const [filteredStories, setFilteredStories] =useState("")

  const fetchStories = async () => {
    const storyIds = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then((res) => res.json())
    .then((data) => {
      return data.slice(0, 21)
    })
    const storyPromises = storyIds.map((storyId) => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then((res) =>
    res.json()
    )
  )
    Promise.all(storyPromises).then((data) => setStoryDetails(data))
  }

  useEffect(() => {
    fetchStories()
    
  }, []);

  const handleSearch = (e) => {
    const filteredStories = storyDetails.filter((story) => story.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredStories(filteredStories)
  }
  
  return (
    <>
      <ol>
        {storyDetails && storyDetails.map((story, index) => 
          <li key={index}><a href={story.url}>{story.title}</a></li>
        )}
      </ol>
      <div>
        Search: <input type="text" onChange={handleSearch}></input>
      </div>
      <ul>
        {filteredStories && filteredStories.map((story, index) => <li key={index}><a href={story.url}>{story.title}</a></li>)}
      </ul>
    </>
  )
}



export default App
