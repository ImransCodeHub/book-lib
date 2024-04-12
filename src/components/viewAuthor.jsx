import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ViewAuthor = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');

    const [action, setAction] = useState('view');

    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthor();
    }, [action]);

    const fetchAuthor = async () => {
        try {
        const response = await fetch(`http://localhost:8080/api/v1/authors/${id}`);
        response.json().then(data => setAuthor(data));
        console.log(author);
        } catch (error) {
        console.error('Error fetching author:', error);
        }
    };

    const handleUpdate = async () => {
        try {

            const requestOptions = {
                method: "PUT",
                redirect: "follow"
                };

            await fetch(`http://localhost:8080/api/v1/authors/${id}?firstName=${editedFirstName}&lastName=${editedLastName}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    
            setEditedFirstName('');
            setEditedLastName('');

            setAction('view');
        }
        catch (error) {
            console.error('Error updating author:', error);
        }
    }

    const handleDelete = async () => {
        const confirmed = window.confirm(`Are you sure you want to delete this author?`);
    
        if (confirmed) {
            try {
                await fetch(`http://localhost:8080/api/v1/authors/${id}`, {
                    method: 'DELETE',
                });
                navigate('/authors');
            } catch (error) {
                console.error('Error deleting author:', error);
            }
        }
    };

    if (!author) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {action === 'view' && (
                <div>
                    <Title level={2}>{author.firstName} {author.lastName}</Title>
                    <Button onClick={() => setAction('edit')}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </div>
            )}
            {action === 'edit' && (
                <div>
                    <Title level={2}>Edit Author</Title>
                    <Space direction="vertical">
                        <Input
                            placeholder="First Name"
                            value={editedFirstName}
                            onChange={e => setEditedFirstName(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Last Name"
                            value={editedLastName}
                            onChange={e => setEditedLastName(e.target.value)}
                            required
                        />
                        <Button onClick={handleUpdate}>Update</Button>
                        <Button onClick={() => setAction('view')}>Cancel</Button>
                    </Space>
                </div>
            )} 
        </>
    )
}

export default ViewAuthor;