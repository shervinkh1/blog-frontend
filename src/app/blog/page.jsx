"use client";

import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/blog/');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredBlogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBlogs.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Our Latest Blogs</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for blogs..."
            className="border px-4 py-2 rounded shadow-md w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                src={blog.image || 'https://via.placeholder.com/300x200'}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.summary}</p>
                <a
                  href={`/post/${blog.id}`}
                  className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full inline-block transition-colors duration-200"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 ${currentPage === number ? 'bg-blue-700 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'} border rounded`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)}
            className={`px-4 py-2 ${currentPage === Math.ceil(filteredBlogs.length / blogsPerPage) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
