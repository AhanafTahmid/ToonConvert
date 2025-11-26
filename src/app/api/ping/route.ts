import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * Returns OK status for uptime monitoring
 * Supports ALL HTTP methods for maximum compatibility with monitoring services
 */
const healthResponse = {
  status: 'OK',
  timestamp: new Date().toISOString(),
  service: 'toonconvert',
};

// GET method - most common for health checks
export async function GET() {
  return NextResponse.json(healthResponse, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// POST method - some monitoring services use this
export async function POST() {
  return NextResponse.json(healthResponse, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// HEAD method - lightweight check
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// PUT method - some services may use this
export async function PUT() {
  return NextResponse.json(healthResponse, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// PATCH method
export async function PATCH() {
  return NextResponse.json(healthResponse, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// DELETE method
export async function DELETE() {
  return NextResponse.json(healthResponse, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// OPTIONS method - for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, HEAD, PUT, PATCH, DELETE, OPTIONS',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
