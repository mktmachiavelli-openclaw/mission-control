import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { agent, project, message } = await request.json();

    // TODO: Integrate with OpenClaw sessions_send API
    // For now, just log it
    console.log(`Mention ${agent} for project ${project}: ${message}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to mention agent:', error);
    return NextResponse.json(
      { error: 'Failed to mention agent' },
      { status: 500 }
    );
  }
}
