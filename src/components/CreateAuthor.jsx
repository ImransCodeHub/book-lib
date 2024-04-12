import React, { useEffect, useState } from 'react';
import { Typography, Input, Button, Space, Select  } from 'antd';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const { Title } = Typography;

const CreateAuthor = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    //const navigate = Navigate();

    // const handleCreate = async () => {
    //     try {
    //         await fetch('http://localhost:8080/api/v1/authors', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 firstName,
    //                 lastName
    //             })
    //         });
    //         setFirstName('');
    //         setLastName('');

    //     } catch (error) {
    //         console.error('Error creating author:', error);
    //     }

    // };
      
    // const handleCreate = async () => {
    //     const requestOptions = {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           firstName: firstName,
    //           lastName: lastName,
    //         }),
    //       };

    //       console.log(requestOptions);
    //     try {
    //     const response = await fetch(
    //         "http://localhost:8080/api/v1/authors",
    //         requestOptions
    //     );
    //     const data = await response.json();
    //     console.log(data);
    //     } catch (error) {
    //     console.error("Error creating author:", error);
    //     }
    // };

    const handleCreate = async () => {
        // const queryParams = new URLSearchParams({
        //     firstName: firstName,
        //     lastName: lastName,
        // });

        // console.log(queryParams);
        // try {
        //     const response = await fetch(
        //         `http://localhost:8080/api/v1/authors?${queryParams}`
        //     );
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error("Error creating author:", error);
        // }



        const requestOptions = {
        method: "POST",
        redirect: "follow"
        };

        await fetch(`http://localhost:8080/api/v1/authors?firstName=${firstName}&lastName=${lastName}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

        setFirstName('');
        setLastName('');
        //navigate('/authors');

    };
    

    return (
        <div>
            <Title level={2}>Create New Author</Title>
            <Space direction="vertical">
                <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                />
                <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                />
                <Button type="primary" onClick={handleCreate}>Create</Button>
            </Space>
        </div>
    );
}

export default CreateAuthor;