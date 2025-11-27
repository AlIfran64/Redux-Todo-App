import React from 'react';
import Todo from '../../Components/Todo/Todo';

const Home = () => {
  return (
    <div className='min-h-screen max-w-6xl mx-auto'>
      <h1 className='text-center my-10 text-2xl font-bold'>Redux TODO App</h1>

      <div className='flex justify-center items-center'>
        <Todo></Todo>
      </div>
    </div>
  );
};

export default Home;