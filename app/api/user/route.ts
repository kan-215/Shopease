// app/api/user/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]'; // Import the authOptions from the new file

export async function GET() {
  const session = await getServerSession(authOptions); // This fetches the session data

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json(session);
}
