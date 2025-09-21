import { NextResponse } from 'next/server';

// Mock data for demonstration - replace with your actual database logic
let posts = [
  {
    id: "abc-pulls-jimmy-kimmel-off-air-controversial-charlie-kirk-comments",
    slug: "abc-pulls-jimmy-kimmel-off-air-controversial-charlie-kirk-comments",
    title: "ABC Pulls Jimmy Kimmel Off Air After Controversial Comments on Charlie Kirk Amid FCC Pressure",
    subtitle: "ABC suspends Jimmy Kimmel Live! indefinitely following host's controversial remarks about Charlie Kirk's death, amid mounting FCC pressure and public backlash.",
    featuredImageUrl: "https://www.thecelebpost.com/assets/uploads/updates/2022-09-29/26414_9034540_jimmykimmel32_updates.jpg",
    category: "lifestyle",
    status: "published",
    isFeatured: false,
    publishAt: "2025-09-18T10:00:00",
    unpublishAt: null,
    lastVersionId: "d780bd92-1c7e-4938-b416-c09cf769e7c8",
    createdBy: "admin",
    updatedBy: "admin",
    createdAt: "2025-09-18T10:00:00",
    updatedAt: "2025-09-18T10:05:00",
  },
  {
    id: "sample-post-2",
    slug: "sample-post-2",
    title: "Sample Post 2",
    subtitle: "This is a sample subtitle for testing purposes.",
    featuredImageUrl: "https://via.placeholder.com/400x200",
    category: "technology",
    status: "draft",
    isFeatured: true,
    publishAt: "2025-09-19T15:30:00",
    unpublishAt: null,
    lastVersionId: "sample-version-id",
    createdBy: "admin",
    updatedBy: "admin",
    createdAt: "2025-09-19T14:00:00",
    updatedAt: "2025-09-19T14:15:00",
  }
];

// Helper function to validate API key
function validateApiKey(request) {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'admin-key-123';
  return apiKey === expectedKey;
}

// Helper function to generate ID
function generateId(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

// GET /api/posts - List posts with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedPosts = posts.slice(startIndex, endIndex);
    const totalItems = posts.length;
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      items: paginatedPosts,
      totalItems,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create new post
export async function POST(request) {
  try {
    // Validate API key for admin operations
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newPost = {
      id: generateId(body.title),
      slug: generateId(body.title),
      title: body.title,
      subtitle: body.subtitle || '',
      featuredImageUrl: body.featuredImageUrl || '',
      category: body.category || '',
      status: body.status || 'draft',
      isFeatured: body.isFeatured || false,
      publishAt: body.publishAt || now,
      unpublishAt: body.unpublishAt || null,
      lastVersionId: `version-${Date.now()}`,
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: now,
      updatedAt: now,
    };

    posts.unshift(newPost); // Add to beginning of array

    return NextResponse.json({
      message: 'Post created successfully',
      data: newPost
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}