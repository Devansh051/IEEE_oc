import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './Leaderboard.css'
import { leaderBoardDetails } from '../data/leaderBoardData';
import { useAuth } from '../context/Authcontext';

const Leaderboard = () => {
    const [searchValue, setSearchValue] = useState('');
    const [nonempty, setnonempty] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [searchMember, setSearchMember] = useState([]);
    const [sortedData, setSortedData] = useState(leaderBoardDetails);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const auth = useAuth();
    const user = auth?.user;

    


    const searchRank = () => {
        const value = searchValue.toLowerCase().trim();
        const filteredData = leaderBoardDetails.filter((item) => {
            return item.name.toLowerCase().trim().includes(value);
        });

        if (filteredData.length > 0) {
            const enrichedData = filteredData.map((item) => {
                const matched = sortedData.find((sortedItem) =>
                    sortedItem.name.toLowerCase().trim() === item.name.toLowerCase().trim()
                );
                const rank = matched ? matched.rank : null;
                return { ...item, rank };
            });

            setSearchMember(enrichedData);
            setnonempty(true);
            setShowAll(false);
        } else {
            setSearchMember([]);
            setnonempty(false);
            setShowAll(false);
        }
    };

    const sortByPoints = () => {
        const sorted = [...leaderBoardDetails].sort((a, b) => b.points - a.points);

        let rankedData = [];
        let currentRank = 1;
        let lastPoints = null;
        let count = 0;

        for (let i = 0; i < sorted.length; i++) {
            const item = sorted[i];
            if (item.points !== lastPoints) {
                currentRank = count + 1;
                count++;
            }
            rankedData.push({ ...item, rank: currentRank });
            lastPoints = item.points;
        }

        setSortedData(rankedData);
    };

    useEffect(() => {
        sortByPoints();
        const interval = setInterval(() => {
            sortByPoints();
        }, 20 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentPage(1); // Reset page on search
        if (searchValue.trim() === '') {
            setShowAll(true);
            setnonempty(false);
            setSearchMember([]);
        }
    }, [searchValue]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    return (
        <div className='main-container'>
            <div className='top-main-container'>
                <div className="top-3-container">
                    <div className="position-place-container1">
                        <div className="image-div">
                            <img src={sortedData[1]?.img} className='images' />
                        </div>
                        <div className="text-container">
                            <p className='rankholder-name'>{sortedData[1]?.name}</p>
                            <p className='rank'> Points: {sortedData[1]?.points}</p>
                        </div>
                        <div className="rank-container-two">
                            <p>2</p>
                        </div>
                    </div>

                    <div className="position-place-container2">
                        <div className="image-div">
                            <img src={sortedData[0]?.img} className='images' />
                        </div>
                        <div className="text-container">
                            <p className='rankholder-name'> {sortedData[0]?.name}</p>
                            <p className='rank'>Points: {sortedData[0]?.points}</p>
                        </div>
                        <div className="rank-container-one">
                            <p>1</p>
                        </div>
                    </div>

                    <div className="position-place-container3">
                        <div className="image-div">
                            <img src={sortedData[2]?.img} className='images' />
                        </div>
                        <div className="text-container">
                            <p className='rankholder-name'>{sortedData[2]?.name}</p>
                            <p className='rank'>Points: {sortedData[2]?.points}</p>
                        </div>
                        <div className="rank-container-third">
                            <p>3</p>
                        </div>
                    </div>
                </div>

                {user != null ? 
                (<div className='user-info-container'>
                    <div className="rank-showcase">
                        <p className='rank-showcase-para'>1</p>
                    </div>
                    <div className="info-container">
                        <div className="user-img-container">
                            <img src={sortedData[0]?.img} alt="" height={'20px'} />
                        </div>
                        <p className='user-name'>{user.displayName}</p>
                        <p className='user-id'>isoc25#1</p>
                        <div className="detail-containerz">
                            <div className="rrank">
                                <p className='rrank-place'>2</p>
                                <p className='rank-text'>Rank</p>
                            </div>
                            <div className='line-div'></div>
                            <div className="pointt">
                                <p className='ppoint-total'>95</p>
                                <p className='point-text'>Points</p>
                            </div>
                            <div className='line-div'></div>
                            <div className="pointt">
                                <p className='ppoint-total'>95</p>
                                <p className='point-text'>Pull Req.</p>
                            </div>
                        </div>
                        <button className="profile-button">Profile</button>
                    </div>
                </div>): 
                (<div className='user-info-container'>
                    <div className="rank-showcase">
                        <p className='rank-showcase-para'>1</p>
                    </div>
                    <div className="info-container">
                        <div className="user-img-container">
                            <img src={sortedData[0]?.img} alt="" height={'20px'} />
                        </div>
                        <p className='user-name'>{sortedData[0].name}</p>
                        <p className='user-id'>isoc25#1</p>
                        <div className="detail-containerz">
                            <div className="rrank">
                                <p className='rrank-place'>2</p>
                                <p className='rank-text'>Rank</p>
                            </div>
                            <div className='line-div'></div>
                            <div className="pointt">
                                <p className='ppoint-total'>95</p>
                                <p className='point-text'>Points</p>
                            </div>
                            <div className='line-div'></div>
                            <div className="pointt">
                                <p className='ppoint-total'>95</p>
                                <p className='point-text'>Pull Req.</p>
                            </div>
                        </div>
                        <button className="profile-button">Profile</button>
                    </div>
                </div>)}
            </div>
                    {/* heloo */}
            <div className="search-text-field">
                <input
                    type="text"
                    placeholder='Search Your Rank'
                    className='search-Bar'
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchRank();
                        }
                    }}
                />
                <FaSearch className='search-icon' onClick={searchRank} style={{ cursor: 'pointer' }} />
            </div>

            <div className="all-ranks-container">
                <div className="rank-heading-container">
                    <div className="rank-heading">
                        <p>Position</p>
                    </div>
                    <div className="details-heading-container">
                        <div className="detail-heading">
                            <p className='rank-heading-Name'>Name</p>
                        </div>
                        <div className="points-heading-container">
                            <p className='p-heading'>Points</p>
                        </div>
                    </div>
                </div>

                {showAll && currentItems.map((item, index) => (
                    <div className="rank-container" key={index}>
                        <div className="rank-number">
                            <div className='point'>{item.rank}</div>
                        </div>
                        <div className="details-container">
                            <div className="detail">
                                <div className="img-container">
                                    <img src={item.img} loading='lazy' />
                                </div>
                                <div className='rank-holderName'>{item.name}</div>
                            </div>
                            <div className="points-container">
                                <p className='p-value'>{item.points}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {nonempty && searchMember.map((item, index) => (
                    <div className="rank-container" key={index}>
                        <div className="rank-number">
                            <div className='point'>{item.rank}</div>
                        </div>
                        <div className="details-container">
                            <div className="detail">
                                <div className="img-container">
                                    <img src={item.img} loading='lazy' />
                                </div>
                                <p className='rank-holderName'>{item.name}</p>
                            </div>
                            <div className="points-container">
                                <p className='p-value'>{item.points}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='not-found'>
                {!showAll && !nonempty && searchMember.length === 0 && (
                    <div className="no-results">
                        <p className='no-result-para'>No results found for "<span>{searchValue}</span>"</p>
                    </div>
                )}
            </div>

            {showAll && (
                <div className="pagination-buttons">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
