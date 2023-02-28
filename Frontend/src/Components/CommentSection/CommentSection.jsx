import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PlaceIcon from '@mui/icons-material/Place';
import accessCategories from '../AccessCategories/AccessCategories';


function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      heading: 'Place A',
      category: accessCategories.D,
      content:
        'This is the first comment. It is short and does not require a read more button.',
      expanded: false,
    },
    {
      id: 2,
      category: accessCategories.B,
      heading: 'Accessible',
      content:
        'This is the second comment. This means it is a bit longer and requires a read more button to expand the content.',
      expanded: false,
    },
    {
      id: 3,
      category: accessCategories.E,
      heading: 'Title',
      content:
        'This is the third comment. It is a very long comment that requires a read more button to view the entire content. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin magna in tortor interdum blandit. Duis mattis sodales augue. Nullam vel ante et neque pulvinar iaculis. Suspendisse potenti. Praesent ut purus vel odio efficitur posuere. Integer pharetra euismod elit, ut gravida neque. Nam id tempor nisl. Vestibulum tempor, nulla nec ullamcorper tristique, libero justo bibendum magna, non feugiat eros mauris a magna. Cras at nunc vel ipsum consectetur pharetra ut eget lectus. Nam accumsan faucibus purus, quis maximus quam vestibulum ut.',
      expanded: false,
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        category: accessCategories.B,
        content: newComment,
        expanded: false,
      },
    ]);
    setNewComment('');
  };

  const handleExpandComment = (id) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          expanded: !comment.expanded,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <Box
      textAlign="center"
      overflow="scroll"
      sx={{
        boxShadow: 3,
        p: 2,
        margin: 'auto',
        height: 0.9,
        width: 0.9,
        zIndex: 2,
      }}
    >
      <Typography variant="h4" component="h4">
        <PlaceIcon fontSize="large" sx={{ color: accessCategories.A.colour }} />
        Comments
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddComment}
        sx={{ m: 2 }}
      >
        Share your view
      </Button>
      {comments.map((comment) => (
        <Box textAlign="start" key={comment.id} sx={{ mt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" component="h6">
            <PlaceIcon
              fontSize="small"
              sx={{ color: comment.category.colour }}
            />
            {comment.heading}
          </Typography>
          <Typography variant="body2" component="p">
            {comment.expanded || comment.content.length < 100
              ? comment.content
              : comment.content.substring(0, 100) + '...'}
            {comment.content.length > 100 && (
              <Button
                variant="text"
                onClick={() => handleExpandComment(comment.id)}
              >
                {comment.expanded ? 'Read less' : 'Read more'}
              </Button>
            )}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default CommentSection;
