import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity } from "lucide-react";
import Image from "next/image";

interface StreamerData {
  profile_image: string;
  station: {
    total_broad_time: string;
    jointime: string;
  upd: {
    fan_cnt: string;
    total_view_cnt: string;
    total_ok_cnt: string;
  }
  user_id: string;
  user_nick: string;
}
  subscription: {
    count: string;
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  console.log("params.id:", id);
  
  try {
    const res = await fetch(`https://chapi.sooplive.co.kr/api/${id}/station`, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: StreamerData = await res.json();

    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col items-center">
          <Image className="rounded-lg" src={data.profile_image} width={300} height={300} alt="로고"></Image>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardContent className="text-2xl font-bold">
                {data.station.user_nick}({data.station.user_id})
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                애청자 수 
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(data.station.upd.fan_cnt).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">누적 유저</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(data.station.upd.total_view_cnt).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">누적 업</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(data.station.upd.total_ok_cnt).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">구독팬 수</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(data.subscription.count).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">누적 방송시간</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(data.station.total_broad_time).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">방송국 개설일</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.station.jointime}</div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return (
      <div>
        <h1>데이터를 불러오는 데 실패했습니다.</h1>
      </div>
    );
  }
}