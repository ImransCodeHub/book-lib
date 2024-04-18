import React, { useEffect, useState } from 'react';
import { Typography, Input, Button, Space, Select  } from 'antd';
import { Navigate } from 'react-router-dom';
import './style.css';

const { Title } = Typography;

const CreateBook = () => {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [editionNumber, setEditionNumber] = useState('');
    const [copyright, setCopyright] = useState('');
    //const [author_id, setAuthor_id] = useState('');
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const { Option } = Select;

    //const navigate = Navigate();

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try{
            const response = await fetch(`http://localhost:8080/api/v1/authors`);
            response.json().then(data => setAuthors(data));
        } catch (error) {
            console.error('Error fetching book:', error);
        }
    };

  const handleCreate = async () => {
    
    const requestOptions = {
      method: "POST",
      redirect: "follow"
      };

    try {
      
      const response = await fetch(`http://localhost:8080/api/v1/books?isbn=${isbn}&copyright=${copyright}&editionNumber=${editionNumber}&title=${title}&author_id=${selectedAuthor}`, requestOptions)
      if (response.status === 200) {

      setIsbn('');
      setTitle('');
      setEditionNumber('');
      setCopyright('');
      setSelectedAuthor('');

        window.alert('Book created successfully');
        window.location.href = '/'; 
      }

    } catch (error) {
      console.error('Error creating book:', error);
    }

  };
  return (
    <div className="centered-container">
    <Title level={2}>Add New Book</Title>
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Input
        placeholder="ISBN"
        value={isbn}
        onChange={e => setIsbn(e.target.value)}
        required
      />
      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Input
        placeholder="Edition Number"
        value={editionNumber}
        onChange={e => setEditionNumber(e.target.value)}
        required
      />
      <Input
        placeholder="Copyright"
        value={copyright}
        onChange={e => setCopyright(e.target.value)}
        required
      />
      <Select
        placeholder="Select Author"
        value={selectedAuthor}
        onChange={value => setSelectedAuthor(value)}
        style={{ width: '35%' }}
        required
      >
        {authors.map(author => (
          <Option key={author.id} value={author.id}>
            {`${author.firstName} ${author.lastName}`}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleCreate}>Create</Button>
    </Space>
  </div>
  );
};

export default CreateBook;
