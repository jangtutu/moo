import { NextResponse } from 'next/server';

export const runtime = 'edge';
export async function GET(request: Request, { params }: { params: { soopIds: string[] } }) {
  const { soopIds } = params;

  const streams = soopIds.map((id) => ({
    name: id,
    player: `https://play.sooplive.co.kr/${id}/embed?`,
  }));

  return NextResponse.json(streams);
}