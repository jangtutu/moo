"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import styles from "./page.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation";

interface Broadcast {
  profile_image: string;
  station: {
    broad_start: string;
    user_id: string;
    user_nick: string;
  };
  broad: {
    broad_no: string;
    broad_title: string;
    current_sum_viewer: string;
  } | null;
}
interface Streamer {
  id: string;
  position: string;
}

export default function Home() {

  const [moosuData, setMoosuData] = useState<Broadcast[]>([]);
  const [moomemData, setMoomemData] = useState<Broadcast[]>([]);
  const [bonghwangData, setBonghwangData] = useState<Broadcast[]>([]);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const toggleCardBorder = (userId: string) => {
    setSelectedCardIds((prevSelected) => {

      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      }
      return [...prevSelected, userId];
    });
  };

  const multiViewClick = () => {
    if (selectedCardIds.length === 0) {
      toast({
        title: "선택된 스트리밍이 없습니다",
        description: "최소 1개 이상의 스트리밍을 선택해주세요.",
        action: (
          <ToastAction altText="Goto schedule to undo">확인</ToastAction>
        ),
      });
      return;
    }
    const idsQuery = selectedCardIds.join("/");
    router.push(`/multiview/${idsQuery}`);
  };


  useEffect(() => {
    async function fetchIDs() {
      const { data: ids, error } = await supabase.from("streamer").select("id, position").order("no");
      if (error) {
        console.error("Error fetching IDs:", error);
        return;
      }

      const moosuIds = ids.filter((item) => item.position === "무수");
      const moomemIds = ids.filter((item) => item.position === "무멤");
      const bonghwangIds = ids.filter((item) => item.position === "봉황");

      const fetchBroadcasts = async (idGroup: Streamer[]) => {
        return await Promise.all(
          idGroup.map(async ({ id }) => {
            const response = await fetch(`https://chapi.sooplive.co.kr/api/${id}/station`, {
              cache: 'no-store',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
              },
            });
            return response.json();
          })
        );
      };

      const moosuBroadcasts = await fetchBroadcasts(moosuIds);
      const moomemBroadcasts = await fetchBroadcasts(moomemIds);
      const bonghwangBroadcasts = await fetchBroadcasts(bonghwangIds);

      setMoosuData(moosuBroadcasts);
      setMoomemData(moomemBroadcasts);
      setBonghwangData(bonghwangBroadcasts);
    }

    fetchIDs();
  }, []);

  return (
    <div>
      <main className={styles.container}>

        <Card className={styles.container__bonghwang}>
          {bonghwangData.map((broadcast, index) => (
            <Card className={`${styles.container__bonghwang__list} ${selectedCardIds.includes(broadcast.station.user_id) ? styles.selected : ""
              }`}
              key={index}
              onClick={() => toggleCardBorder(broadcast.station.user_id)}
            >
              <CardHeader className={styles.container__cardheader}>
                <Image
                  src={broadcast.broad?.broad_no
                    ? `https://liveimg.sooplive.co.kr/m/${broadcast.broad.broad_no}`
                    : '/images/offline.png'
                  }
                  alt="생방송 이미지"
                  width={350}
                  height={300}
                  className={styles.container__cardheader__liveimg}
                />
                {broadcast.broad && (
                  <>
                    <span className={styles.container__cardheader__view}>
                      {broadcast.broad.current_sum_viewer.toLocaleString() || '0'}
                    </span>
                    <span className={styles.container__cardheader__livestart}>
                      {broadcast.station.broad_start || '방송 시작 시간 없음'} 방송시작
                    </span>
                  </>
                )}
              </CardHeader>
              <CardContent className={styles.container__cardcontent}>
                <Avatar>
                  <a href={`https://sooplive.co.kr/${broadcast.station.user_id}`}>
                    <AvatarImage src={broadcast.profile_image} />
                  </a>
                  <AvatarFallback>배너</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-xs font-bold">
                    {broadcast.station.user_nick}
                  </p>
                  <p className="text-s">
                    {broadcast.broad?.broad_title || '현재 방송중이지 않습니다.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </Card>

        <Card className={styles.container__moosu}>
          {moosuData.map((broadcast, index) => (
            <Card
              className={`${styles.container__moosu__list} ${selectedCardIds.includes(broadcast.station.user_id) ? styles.selected : ""
                }`}
              key={index}
              onClick={() => toggleCardBorder(broadcast.station.user_id)}
            >
              <CardHeader className={styles.container__cardheader}>
                <Image
                  src={broadcast.broad?.broad_no
                    ? `https://liveimg.sooplive.co.kr/m/${broadcast.broad.broad_no}`
                    : '/images/offline.png'
                  }
                  alt="생방송 이미지"
                  width={350}
                  height={300}
                  className={styles.container__cardheader__liveimg}
                />
                {broadcast.broad && (
                  <>
                    <span className={styles.container__cardheader__view}>
                      {broadcast.broad.current_sum_viewer.toLocaleString() || '0'}
                    </span>
                    <span className={styles.container__cardheader__livestart}>
                      {broadcast.station.broad_start || '방송 시작 시간 없음'} 방송시작
                    </span>
                  </>
                )}
              </CardHeader>
              <CardContent className={styles.container__cardcontent}>
                <Avatar>
                  <a href={`https://sooplive.co.kr/${broadcast.station.user_id}`}>
                    <AvatarImage src={broadcast.profile_image} />
                  </a>
                  <AvatarFallback>배너</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-xs font-bold">
                    {broadcast.station.user_nick}
                  </p>
                  <p className="text-s">
                    {broadcast.broad?.broad_title || '현재 방송중이지 않습니다.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </Card>

        <Card className={styles.container__moomem}>
          {moomemData.map((broadcast, index) => (
            <Card
              className={`${styles.container__moomem__list} ${selectedCardIds.includes(broadcast.station.user_id) ? styles.selected : ""
                }`}
              key={index}
              onClick={() => toggleCardBorder(broadcast.station.user_id)}
            >
              <CardHeader className={styles.container__cardheader}>
                <Image
                  src={broadcast.broad?.broad_no
                    ? `https://liveimg.sooplive.co.kr/m/${broadcast.broad.broad_no}`
                    : '/images/offline.png'
                  }
                  alt="생방송 이미지"
                  width={350}
                  height={300}
                  className={styles.container__cardheader__liveimg}
                />
                {broadcast.broad && (
                  <>
                    <span className={styles.container__cardheader__view}>
                      {broadcast.broad.current_sum_viewer.toLocaleString() || '0'}
                    </span>
                    <span className={styles.container__cardheader__livestart}>
                      {broadcast.station.broad_start || '방송 시작 시간 없음'} 방송시작
                    </span>
                  </>
                )}
              </CardHeader>
              <CardContent className={styles.container__cardcontent}>
                <Avatar>
                  <a href={`https://sooplive.co.kr/${broadcast.station.user_id}`}>
                    <AvatarImage src={broadcast.profile_image} />
                  </a>
                  <AvatarFallback>배너</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-xs font-bold">
                    {broadcast.station.user_nick}
                  </p>
                  <p className="text-s">
                    {broadcast.broad?.broad_title || '현재 방송중이지 않습니다.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </Card>
      </main>

      <Button className={styles.container__multiviewbutton} onClick={multiViewClick}>멀티뷰로 보기</Button>



      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://cafe.naver.com/moomoo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          봉준 팬카페 바로가기 →
        </a>
      </footer>
    </div>
  );
}
