import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { soopIds: string[] } }) {
  const { soopIds } = params;
  console.log(soopIds);

  const streams = soopIds.map((id) => ({
    name: id,
    player: `https://play.sooplive.co.kr/${id}/embed?showChat=true`,
  }));

  return NextResponse.json(streams);
}