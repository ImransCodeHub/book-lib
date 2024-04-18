import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Input, Typography, Space } from 'antd'
import { PageLayout } from './PageLayout.tsx';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons'; // SearchOutlined icon

const { Title, Text } = Typography

export default function AuthorsPage() {

    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/authors')
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Error fetching authors:', error));
    }, []);

    // Filter authors based on the search term
    const filteredAuthors = authors.filter(author =>
        author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
  
    <PageLayout layout="full-width">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>

            <div style={{ textAlign: 'center' }}>
                <Title level={2}>All the Authors</Title>
                <Text>Explore our vast collection of authors.</Text>
            </div>

            <Input
            style={{ width: '35%' }}
            placeholder="Search by authors..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchTerm(e.target.value)}
            />
            <Row gutter={[16, 16]}>
                {filteredAuthors.map(author => (
                <Col key={author.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card hoverable
                    onClick={() => navigate(`/authors/${author.id}`)}
                
                    >
                        {/* <img
                            alt={book.title}
                            src={book.coverUrl}
                        /> */}
                        <Card.Meta
                            title={author.firstName}
                            description={author.lastName}
                        />

                    </Card>
                </Col>
                ))}
            </Row>
        </Space>
    </PageLayout>
  )
}
