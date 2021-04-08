import React, { Fragment } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = (props) => {
    const {
        searchTerm,
        searchValue,
        setIsLoading,
        setSearchResults
    } = props;


    return <span className="content">
        <a href="#" onClick={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            try {
                const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                setSearchResults(results);
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        }}>{searchValue}</a>
    </span>
}

function photosHTML(images, primaryimageurl) {
    if (images) {
        if (images.length > 0) {
            return images.map(image => <img src={image.baseimageurl} />);
        } else if (primaryimageurl) {
            return [<img src={primaryimageurl} />]
        } else {
            return [];
        }
    } else return '';
}

const Feature = (props) => {

    const { featuredResult, setIsLoading, setSearchResults } = props;

    const {
        title,
        dated,
        images,
        primaryimageurl,
        description,
        culture,
        style,
        technique,
        medium,
        dimensions,
        people,
        department,
        division,
        contact,
        creditline
    } = featuredResult || {};

    if (!featuredResult) {
        return <main id="feature"></main>
    } else {
        return <main id="feature">
            <div className="object-feature">
                <header>
                    <h3>{title}</h3>
                    <h4>{dated}</h4>
                </header>
                <section className="facts">

                    {description ?
                        <React.Fragment>
                            <span className="title"> Description</span>
                            <span className="content">{description}</span>
                        </React.Fragment> : null}
                    {culture ?
                        <React.Fragment>
                            <span className="title">Culture</span>
                            <span className="content"><Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'culture'} searchValue={culture}></Searchable></span>
                        </React.Fragment> : null}
                    {style ?
                        <React.Fragment>
                            <span className="title">Style</span>
                            <span className="content">{style}</span>
                        </React.Fragment> : null}

                    {technique ?
                        <React.Fragment>
                            <span className="title">Technique</span>
                            <span className="content"><Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'technique'} searchValue={technique}></Searchable></span>
                        </React.Fragment> : null}

                    {medium ?
                        <React.Fragment>
                            <span className="title">Medium</span>
                            <span className="content"><Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'medium'} searchValue={medium.toLowerCase()}></Searchable></span>
                        </React.Fragment> : null}

                    {dimensions ?
                        <React.Fragment>
                            <span className="title">Dimensions</span>
                            <span className="content">{dimensions}</span>
                        </React.Fragment> : null}

                    {people ?
                        <React.Fragment>
                            <span className="title">People</span>
                            {
                                people ?
                                    people.map((person, idx) => {
                                        return <span key={idx} className="content">{person.prefix} <Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'person'} searchValue={person.name}></Searchable></span>
                                    }) : null
                            }
                        </React.Fragment> : null}


                    {title ?
                        <React.Fragment>
                            <span className="title">Department</span>
                            <span className="content">{department}</span>
                        </React.Fragment> : null}

                    {division ?
                        <React.Fragment>
                            <span className="title">Division</span>
                            <span className="content">{division}</span>
                        </React.Fragment> : null}

                    {contact ?
                        <React.Fragment>
                            <span className="title">Contact</span>
                            <span className="content">{contact}</span>
                        </React.Fragment> : null}

                    {creditline ?
                        <React.Fragment>
                            <span className="title">Credit</span>
                            <span className="content">{creditline}</span>
                        </React.Fragment> : null}

                </section>
                <section class="photos">
                    {photosHTML(images, primaryimageurl)}
                </section>
            </div>
        </main>
    }
}
export default Feature;