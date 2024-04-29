import logo from './logo.svg';
import { useState, useEffect, useRef, } from 'react';
import './App.css';

function App() {

  let [page, setPage] = useState(1);
  let [data, setData] = useState([]);
  let [keyword, setKeyword] = useState("nulll");
  let [inputVal, setInputVal] = useState("");


  let apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=9`;
  let apiKey = "J6s6FU7f0yjOZy7xNiRpZEC-kE7hODzBVnx1whBxHoc";

  const fetchingData = async () => {
    let res = await fetch(apiUrl + "&client_id=" + apiKey);
    let fetchedData = await res.json();

    setData(fetchedData.results)

  }
  console.log(data);

  useEffect(() => {
    fetchingData();
  }, [keyword])





  const handleChange = (e) => {
    setInputVal(e.target.value);
  }


  const handleClick = (e) => {
    e.preventDefault();
    setKeyword(inputVal);
  }


  // const handlePrevoius = (e) => {
  //   setPage(page - 1);
  //   if (page == 1) {
  //     setPage(1);
  //     alert("mat kar piche");
  //   }
  // }
  // const handleNext = (e) => {
  //   setPage(page + 1);
  //   // alert("lksdjfkdsaj")
  //   // console.log("next page");
  // }
  // console.log(page);


  const handleShowMore = async (e) => {
    // setPage(page + 1); // Increment the page number
    console.log(page);
    // Fetch data for the next page
    let nextPageUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=9&client_id=${apiKey}`;
    let res = await fetch(nextPageUrl);
    let newData = await res.json();

    // Append the new data to the existing data
    setData([...data, ...newData.results]);
  };


  // const handleShowMore = () => {
  //   setPage(page + 1); // Increment the page number
  //   fetchingData(); // Call fetchingData with the updated page number
  // };

  return (
    <div className='container'>
      <h1>Image Slider Project</h1>
      <form id="search-form">
        <input value={inputVal} onChange={handleChange} type="text" id="search-box" placeholder="Search Image Here..." />
        <button onClick={handleClick} id="search">Search</button>
      </form>

      <div id="search-result">
        {data.map((item, i) => {
          return (
            <img key={i} src={item.urls.small} alt="" target="_blank" />
          )
        })
        }
      </div>
      <button onClick={handleShowMore} id="show-more-btn">Show More</button>
      {/* <button onClick={handleNext} id="show-more-btn">Next</button> */}
      {/* <button onClick={handlePrevoius} id="show-more-btn">Prevoius</button>*/}

    </div>

  );
}


export default App;
