// Example usage in components
import React, { useEffect } from 'react';
import { blogEvents, logAnalyticsEvent } from '@/components/analytics/events';

// Example: Track post views
export function PostViewTracker({ postId, postTitle, category }) {
  useEffect(() => {
    // Track when user views a post
    blogEvents.viewPost(postId, postTitle, category);
  }, [postId, postTitle, category]);

  return null;
}

// Example: Track button clicks
export function ShareButton({ postId, platform }) {
  const handleShare = () => {
    // Track share event
    blogEvents.sharePost(postId, platform);
    // Your share logic here
  };

  return (
    <button onClick={handleShare}>
      Share on {platform}
    </button>
  );
}

// Example: Track search
export function SearchForm() {
  const handleSearch = (searchTerm) => {
    blogEvents.searchPosts(searchTerm);
    // Your search logic here
  };

  return (
    // Your search form JSX
    <div>Search form here</div>
  );
}