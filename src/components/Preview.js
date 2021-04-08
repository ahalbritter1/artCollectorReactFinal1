import React from 'react';

import { fetchQueryResultsFromURL } from '../api';
const Preview = (props) => {
  const {
    setSearchResults,
    setFeaturedResult,
    setIsLoading } = props;

  const {
    info,
    records
  } = props.searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);
    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return <aside id="preview">
    <header className="pagination">
     
      <button
        disabled={!info.prev ? true : false}
        className="previous"
        onClick={() => fetchPage(info.prev)}>Previous</button>
      <button
        disabled={!info.next ? true : false}
        className="next"
        onClick={() => fetchPage(info.next)}>Next</button>
    </header>
    <section className="results">
      {
        // Here we should map over the records, and render something like this for each one:
        records.map((record, index) => {
          return <div
            key={index}
            className="object-preview"
            onClick={(event) => {
              event.preventDefault();
              setFeaturedResult(record);
            }}>
            <img src={record.primaryimageurl ? record.primaryimageurl : null} alt={record.description ? record.description : ''} />
            <h3> {record.title ? record.title : 'MISSING INFO'}</h3>
          </div>
        })
      }
    </section>
  </aside>
}
export default Preview;