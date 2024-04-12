import React, { useState, useEffect } from 'react';

function Library() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <div>
            {books.map(book => (
                <div className="book" key={book.id}>
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                    <p>{book.editionNumber}</p>
                    <p>{book.isbn}</p>
                </div>
            ))}
        </div>
    );
}

export default Library;

