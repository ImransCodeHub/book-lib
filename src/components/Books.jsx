import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Input, Typography, Space } from 'antd'
import { PageLayout } from './PageLayout.tsx';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography


export default function BooksLibraryPage() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const placeholderImageUrl = 'https://via.placeholder.com/150'; // Placeholder image URL
    const [bookImages, setBookImages] = useState({}); // State to store book image URLs

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/books')
            .then(response => response.json())
            .then(data => {
                // Initialize bookImages state with placeholders
                const initialBookImages = {};
                data.forEach(book => {
                    initialBookImages[book.isbn] = placeholderImageUrl;
                });
                setBookImages(initialBookImages);
                setBooks(data);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const apiKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    const fetchImagesForBooks = async (books) => {
        const updatedBookImages = {};
        await Promise.all(books.map(async (book) => {
            const imageUrl = await fetchImage(book.title);
            updatedBookImages[book.isbn] = imageUrl;
        }));
        setBookImages(prevState => ({ ...prevState, ...updatedBookImages }));
    };

    const fetchImage = async (bookTitle) => {
        console.log(process.env.GOOGLE_API_KEY);
console.log(process.env.GOOGLE_SEARCH_ENGINE_ID);

        console.log(apiKey + " " + searchEngineId);
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(bookTitle)}&searchType=image`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                return data.items[0].link;
            } else {
                throw new Error('No image found');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            return placeholderImageUrl;
        }
    };

    useEffect(() => {
        fetchImagesForBooks(books);
    }, [books]);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageLayout layout="full-width">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2}>Comic Book Library</Title>
                    <Text>Explore our vast collection of comic books.</Text>
                </div>

                <Input
                    style={{ width: '35%' }}
                    placeholder="Search by title..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchTerm(e.target.value)}
                />

                <Row gutter={[16, 16]}>
                    {filteredBooks.map(book => (
                        <Col key={book.isbn} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Card hoverable onClick={() => navigate(`/books/${book.isbn}`)}>
                                <img
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                    src={bookImages[book.isbn] || placeholderImageUrl}
                                    alt="Book Cover"
                                />

                                <Card.Meta
                                    title={book.title}
                                    description={`By ${
                                        book.authorList.length > 0
                                            ? `${book.authorList[0].firstName} ${book.authorList[0].lastName}`
                                            : 'Unknown Author'
                                    }`}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Space>
        </PageLayout>
    );
}

// export default function BooksLibraryPage() {

//     const navigate = useNavigate();
//     const [books, setBooks] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetch('http://localhost:8080/api/v1/books')
//             .then(response => response.json())
//             .then(data => setBooks(data))
//             .catch(error => console.error('Error fetching books:', error));
//     }, []);

//     const filteredBooks = books.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const apiKey = 'AIzaSyDS3Wu2Pb_y5ivRqoBeqw0FrQrqlAeOGvU';
//     const searchEngineId = '045577f66b96649bc';
//     const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(bookTitle)}&searchType=image`;

//     let bookTitle;
//     if (books && books.length > 0 && books[0].title) {
//         bookTitle = books[0].title;
//     } else {
//         bookTitle = 'title';
//     }
        
//     const [firstImage, setFirstImage] = useState(null);
//     const fetchImage = async () => {
//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             if (data.items && data.items.length > 0) {
//                 const firstItem = data.items[0];
//                 setFirstImage(firstItem.link);
//             } else {
//                 throw new Error('No image found');
//             }
//         } catch (error) {
//             console.error('Error fetching image:', error);
//         }
//     };

//     useEffect(() => {
//         fetchImage();
//     }, [bookTitle]);
    

//   return (
  
//     <PageLayout layout="full-width">
//         <Space direction="vertical" size="large" style={{ width: '100%' }}>

//             <div style={{ textAlign: 'center' }}>
//                 <Title level={2}>Comic Book Library</Title>
//                 <Text>Explore our vast collection of comic books.</Text>
//             </div>

//             <Input
//             style={{ width: '35%' }}
//             placeholder="Search by title..."
//             prefix={<SearchOutlined />}
//             onChange={e => setSearchTerm(e.target.value)}
//             />
//             <Row gutter={[16, 16]}>
//                 {filteredBooks.map(book => (
//                 <Col key={book.isbn} xs={24} sm={12} md={8} lg={6} xl={4}>
//                     <Card hoverable
//                     onClick={() => navigate(`/books/${book.isbn}`)}
//                     >
//                         <>
//                         {firstImage && (
//                 <img
//                 {...console.log(firstImage)}
//                     style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//                     src={firstImage}
//                     alt="Book Cover"
//                 />
//             )}
//                         </>
//                         {/* <img
//                             style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//                             {...book.imageUrl !== null
//                                 ? { src: book.imageUrl }
//                                 : { src: 'https://via.placeholder.com/150' }
//                             }

//                         /> */}
//                         <Card.Meta
//                             title={book.title}
//                             description={`By ${
//                                 book.authorList.length > 0
//                                     ? `${book.authorList[0].firstName} ${book.authorList[0].lastName}`
//                                     : 'Unknown Author'
//                             }`}
//                         />
//                         {/* Remove these? */}
//                         <p>ISBN: {book.isbn}</p>
//                         <p>Edition Number: {book.editionNumber}</p>
//                         <p>Copyright: {book.copyright}</p>
//                     </Card>
//                 </Col>
//                 ))}
//             </Row>
//         </Space>
//     </PageLayout>
//   )
// }

// export default function BooksLibraryPage() {
//     const navigate = useNavigate();
//     const [books, setBooks] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [firstImage, setFirstImage] = useState(null);

//     useEffect(() => {
//         fetch('http://localhost:8080/api/v1/books')
//             .then(response => response.json())
//             .then(data => setBooks(data))
//             .catch(error => console.error('Error fetching books:', error));
//     }, []);

//     const filteredBooks = books.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     let bookTitle;
//     if (books && books.length > 0 && books[0].title) {
//         bookTitle = books[0].title;
//     } else {
//         bookTitle = 'title';
//     }

//     const apiKey = 'AIzaSyDS3Wu2Pb_y5ivRqoBeqw0FrQrqlAeOGvU';
//     const searchEngineId = '045577f66b96649bc';
//     const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(bookTitle)}&searchType=image`;

//     const fetchImage = async () => {
//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             if (data.items && data.items.length > 0) {
//                 const firstItem = data.items[0];
//                 setFirstImage(firstItem.link);
//             } else {
//                 throw new Error('No image found');
//             }
//         } catch (error) {
//             console.error('Error fetching image:', error);
//         }
//     };

//     useEffect(() => {
//         // fetchImage() for every book in the books array
//         books.forEach(book => {
//             fetchImage();
//         });
//     }, [bookTitle]);

//     return (
//         <PageLayout layout="full-width">
//             <Space direction="vertical" size="large" style={{ width: '100%' }}>
//                 <div style={{ textAlign: 'center' }}>
//                     <Title level={2}>Comic Book Library</Title>
//                     <Text>Explore our vast collection of comic books.</Text>
//                 </div>

//                 <Input
//                     style={{ width: '35%' }}
//                     placeholder="Search by title..."
//                     prefix={<SearchOutlined />}
//                     onChange={e => setSearchTerm(e.target.value)}
//                 />

//                 <Row gutter={[16, 16]}>
//                     {filteredBooks.map(book => (
//                         <Col key={book.isbn} xs={24} sm={12} md={8} lg={6} xl={4}>
//                             <Card hoverable onClick={() => navigate(`/books/${book.isbn}`)}>
//                                 {firstImage && (
//                                     <img
//                                         style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//                                         src={firstImage}
//                                         alt="Book Cover"
//                                     />
//                                 )}

//                                 <Card.Meta
//                                     title={book.title}
//                                     description={`By ${
//                                         book.authorList.length > 0
//                                             ? `${book.authorList[0].firstName} ${book.authorList[0].lastName}`
//                                             : 'Unknown Author'
//                                     }`}
//                                 />
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </Space>
//         </PageLayout>
//     );
// }

// export default function BooksLibraryPage() {
//     const navigate = useNavigate();
//     const [books, setBooks] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetch('http://localhost:8080/api/v1/books')
//             .then(response => response.json())
//             .then(data => setBooks(data))
//             .catch(error => console.error('Error fetching books:', error));
//     }, []);

//     const apiKey = 'AIzaSyDS3Wu2Pb_y5ivRqoBeqw0FrQrqlAeOGvU';
//     const searchEngineId = '045577f66b96649bc';

//     const fetchImage = async (bookTitle) => {
//         const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(bookTitle)}&searchType=image`;

//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             if (data.items && data.items.length > 0) {
//                 return data.items[0].link;
//             } else {
//                 throw new Error('No image found');
//             }
//         } catch (error) {
//             console.error('Error fetching image:', error);
//             return null;
//         }
//     };

//     useEffect(() => {
//         const fetchImagesForBooks = async () => {
//             const bookImages = await Promise.all(books.map(async (book) => {
//                 return {
//                     isbn: book.isbn,
//                     imageUrl: await fetchImage(book.title)
//                 };
//             }));
//             setBooks(books => books.map(book => {
//                 const bookImage = bookImages.find(image => image.isbn === book.isbn);
//                 return { ...book, imageUrl: bookImage ? bookImage.imageUrl : null };
//             }));
//         };

//         fetchImagesForBooks();
//     }, [books]);

//     const filteredBooks = books.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (

//             <PageLayout layout="full-width">
//                 <Space direction="vertical" size="large" style={{ width: '100%' }}>
//                     <div style={{ textAlign: 'center' }}>
//                         <Title level={2}>Comic Book Library</Title>
//                         <Text>Explore our vast collection of comic books.</Text>
//                     </div>
    
//                     <Input
//                         style={{ width: '35%' }}
//                         placeholder="Search by title..."
//                         prefix={<SearchOutlined />}
//                         onChange={e => setSearchTerm(e.target.value)}
//                     />
    
//                     <Row gutter={[16, 16]}>
//                         {filteredBooks.map(book => (
//                             <Col key={book.isbn} xs={24} sm={12} md={8} lg={6} xl={4}>
//                                 <Card hoverable onClick={() => navigate(`/books/${book.isbn}`)}>
//                                     {book.imageUrl && (
//                                         <img
//                                             style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//                                             src={book.imageUrl}
//                                             alt="Book Cover"
//                                         />
//                                     )}
    
//                                     <Card.Meta
//                                         title={book.title}
//                                         description={`By ${
//                                             book.authorList.length > 0
//                                                 ? `${book.authorList[0].firstName} ${book.authorList[0].lastName}`
//                                                 : 'Unknown Author'
//                                         }`}
//                                     />
//                                 </Card>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Space>
//             </PageLayout>
//     );
// }

// export default function BooksLibraryPage() {
//     const navigate = useNavigate();
//     const [books, setBooks] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const placeholderImageUrl = 'https://via.placeholder.com/150'; // Placeholder image URL

//     useEffect(() => {
//         fetch('http://localhost:8080/api/v1/books')
//             .then(response => response.json())
//             .then(data => setBooks(data))
//             .catch(error => console.error('Error fetching books:', error));
//     }, []);

//     const apiKey = 'AIzaSyDS3Wu2Pb_y5ivRqoBeqw0FrQrqlAeOGvU';
//     const searchEngineId = '045577f66b96649bc';

//     const fetchImagesForBooks = async (books) => {
//         const updatedBooks = await Promise.all(books.map(async (book) => {
//             const imageUrl = await fetchImage(book.title);
//             return { ...book, imageUrl };
//         }));
//         return updatedBooks;
//     };

//     const fetchImage = async (bookTitle) => {
//         const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(bookTitle)}&searchType=image`;

//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             if (data.items && data.items.length > 0) {
//                 return data.items[0].link;
//             } else {
//                 throw new Error('No image found');
//             }
//         } catch (error) {
//             console.error('Error fetching image:', error);
//             return null;
//         }
//     };

//     useEffect(() => {
//         const fetchBooksAndImages = async () => {
//             const updatedBooks = await fetchImagesForBooks(books);
//             setBooks(updatedBooks);
//         };

//         fetchBooksAndImages();
//     }, [books]);

//     const filteredBooks = books.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <PageLayout layout="full-width">
//             <Space direction="vertical" size="large" style={{ width: '100%' }}>
//                 <div style={{ textAlign: 'center' }}>
//                     <Title level={2}>Comic Book Library</Title>
//                     <Text>Explore our vast collection of comic books.</Text>
//                 </div>

//                 <Input
//                     style={{ width: '35%' }}
//                     placeholder="Search by title..."
//                     prefix={<SearchOutlined />}
//                     onChange={e => setSearchTerm(e.target.value)}
//                 />

//                 <Row gutter={[16, 16]}>
//                     {filteredBooks.map(book => (
//                         <Col key={book.isbn} xs={24} sm={12} md={8} lg={6} xl={4}>
//                             <Card hoverable onClick={() => navigate(`/books/${book.isbn}`)}>
//                                 <img
//                                     style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//                                     src={book.imageUrl}
//                                     alt="Book Cover"
//                                 />

//                                 <Card.Meta
//                                     title={book.title}
//                                     description={`By ${
//                                         book.authorList.length > 0
//                                             ? `${book.authorList[0].firstName} ${book.authorList[0].lastName}`
//                                             : 'Unknown Author'
//                                     }`}
//                                 />
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </Space>
//         </PageLayout>
//     );
// }

