import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import './CryptoNews.css'

const CryptoNews = () => {
    const [articles, setArticles] = useState(null)
  
    useEffect(() => {
        const options = {
          method: 'GET',
          url: 'https://crypto-pulse.p.rapidapi.com/news',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'crypto-pulse.p.rapidapi.com'
          }
        }

        axios.request(options).then((response) => {
          console.log(response.data)
          setArticles(response.data)
        }).catch((error) => {
          console.error(error)
        })
    }, []);

    console.log(articles)
    
    const first6Articles = articles?.slice(0,6)

    return (
      <div className="news-feed">
          <h2>Cryptocurrency News</h2>
          <div className='news-feed-container'>
          {first6Articles?.map((article, _index) => (
              <div className='news-card' key={_index}>
                    <h3 className='crypto-news-title'>{article.title}</h3>
                    <div className='crypto-news-title-sub'>
                        <div>
                            <p className='crypto-news-source'>{article.source}</p>
                        </div>
                        <div>
                            <p className='crypto-news-date'>{article.date}</p>
                        </div>
                    </div>
                    <p className='crypto-news-description'>{article.description}</p>
                  <div className='crypto-news-link-container'>
                        <a className='crypto-news-link' href={article.link} target="_blank">Read More...</a>
                  </div>
              </div>))}
            </div>
      </div>
    )
  }
  
  export default CryptoNews;