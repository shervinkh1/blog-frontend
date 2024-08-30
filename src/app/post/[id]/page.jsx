import React from 'react';
import Footer from '../../Footer';
import Header from '../../Header';
import { Avatar } from '@mui/material';
import { Person, DateRange, Category, Tag } from '@mui/icons-material';

// Fetch post data
async function fetchPost(id) {
  const res = await fetch(`http://localhost:8000/api/blog/${id}/`, { next: { revalidate: 10 } });
  const post = await res.json();
  return post;
}

const PostDetailPage = async ({ params }) => {
  const { id } = params;
  const post = await fetchPost(id);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={post.image || 'https://via.placeholder.com/800x400'}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 mb-4 space-x-2">
              <DateRange fontSize="small" />
              <span className="text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
            
              <span className="text-sm font-medium">{post.author}</span>
              {/* <Person fontSize="small" /> */}

            </div>
            <p className="text-gray-800 leading-relaxed mb-6">{post.content}</p>
          </div>
        </div>

        {/* نمایش سایر جزئیات پست */}
        <div className="bg-gray-100 rounded-lg p-6 shadow-inner">
          <h2 className="text-2xl font-semibold mb-4">Post Details</h2>
          <div className="flex items-center space-x-2 mb-2">
            <Category fontSize="small" />
            <p className="text-gray-700">Category: {post.category || 'Uncategorized'}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Tag fontSize="small" />
            <p className="text-gray-700">Tags: {post.tags ? post.tags.join(', ') : 'No tags'}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetailPage;
