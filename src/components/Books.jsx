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

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

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
            placeholder="Search by title..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchTerm(e.target.value)}
            />
            <Row gutter={[16, 16]}>
                {filteredBooks.map(book => (
                <Col key={book.isbn} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable
                    onClick={() => navigate(`/books/${book.isbn}`)}
                    >
                        {/* <img
                            alt={book.title}
                            src={book.coverUrl}
                        /> */}
                        <Card.Meta
                            title={book.title}
                            description={`By ${
                                book.authorList.length > 0
                                    ? `${book.authorList[0].firstName} ${book.authorList[0].lastName}`
                                    : 'Unknown Author'
                            }`}
                        />
                        {/* Remove these */}
                        <p>ISBN: {book.isbn}</p>
                        <p>Edition Number: {book.editionNumber}</p>
                        <p>Copyright: {book.copyright}</p>
                    </Card>
                </Col>
                ))}
            </Row>
        </Space>
    </PageLayout>
  )
}
