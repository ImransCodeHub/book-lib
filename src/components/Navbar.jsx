import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';


const Navbar = () => {

  const { Item } = Menu;

  return (
    <Menu theme="dark" mode="horizontal">
      <Item key="books">
        <Link to="/">All Books</Link>
      </Item>
      <Item key="create-book">
        <Link to="/create-book">Add Book</Link>
      </Item>
      <Item key="authors">
        <Link to="/authors">All Authors</Link>
      </Item>
      <Item key="create-author">
        <Link to="/create-author">Add Author</Link>
      </Item>
    </Menu>
  );
};

export default Navbar;
