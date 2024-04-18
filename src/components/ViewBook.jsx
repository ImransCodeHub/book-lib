import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ViewBook = () => {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedEditionNumber, setEditedEditionNumber] = useState('');
    const [editedCopyright, setEditedCopyright] = useState('');

    const [action, setAction] = useState('view');

    const navigate = useNavigate();

    useEffect(() => {
        fetchBook();
    }, [action]);

    const fetchBook = async () => {
        try {
        const response = await fetch(`http://localhost:8080/api/v1/books/${isbn}`);
        response.json().then(data => setBook(data));
        } catch (error) {
        console.error('Error fetching book:', error);
        }
    };

    const handleUpdate = async () => {
        
        const requestOptions = {
            method: "PUT",
            redirect: "follow"
        };

        try {
            await fetch(`http://localhost:8080/api/v1/books/${isbn}?copyright=${editedCopyright}&editionNumber=${editedEditionNumber}&title=${editedTitle}`,
             requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));

                setEditedTitle('');
                setEditedEditionNumber('');
                setEditedCopyright('');

            setAction('view');
        }
        catch (error) {
            console.error('Error updating book:', error);
        }
    }

    const handleDelete = async () => {
        //const confirmed = window.confirm(`Are you sure you want to delete this book?`);

        //if (!confirmed) {
            try {
                await fetch(`http://localhost:8080/api/v1/books/${isbn}`, {
                    method: 'DELETE',
                });
                navigate('/');
            }
            catch (error) {
                console.error('Error deleting book:', error);
            }
        //}
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {action === 'view' && (
                <div>
                    <Title level={2} style={{ textAlign: 'center' }}>{book.title}</Title>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Input
                            placeholder="Title"
                            value={'ISBN: '+book.isbn}
                            disabled
                        />
                        <Input
                            placeholder="Edition Number"
                            value={'Edition Number: '+ book.editionNumber}
                            disabled
                        />
                        <Input
                            placeholder="Copyright"
                            value={'Copyright: '+book.copyright}
                            disabled
                        />
                        <Button type="primary" onClick={() => setAction('edit')}>Edit</Button>
                        <Button type="danger" onClick={handleDelete}>Delete</Button>
                    </Space>
                </div>
            )}
            {action === 'edit' && (
                <div>
                    <Title level={2} style={{ textAlign: 'center' }}>{book.title}</Title>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Input
                            placeholder="Title"
                            value={editedTitle}
                            onChange={e => setEditedTitle(e.target.value)}
                        />
                        <Input
                            placeholder="Edition Number"
                            value={editedEditionNumber}
                            onChange={e => setEditedEditionNumber(e.target.value)}
                        />
                        <Input
                            placeholder="Copyright"
                            value={editedCopyright}
                            onChange={e => setEditedCopyright(e.target.value)}
                        />
                        <Button type="primary" onClick={handleUpdate}>Update</Button>
                        <Button onClick={() => setAction('view')}>Cancel</Button>
                    </Space>
                </div>
            )}
        </>
    );
    
};

export default ViewBook;
