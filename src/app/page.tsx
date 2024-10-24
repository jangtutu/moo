"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import styles from "./page.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";

export default function Home() {

  const [multiViewButton, setMultiviewButton] = useState(false);

  return (
    <div>
      <main className={styles.container}>
        <Card className={styles.container__moosu}>
          <Card className={styles.container__moosu__list}>
            <CardHeader className={styles.container__cardheader}>
              <Image src="https://liveimg.sooplive.co.kr/m/277802864" alt="생방송 이미지" width={350} height={300} className={styles.container__cardheader__liveimg} />
              <span className={styles.container__cardheader__view}>20,000</span>
              <span className={styles.container__cardheader__livestart}>10-18 10:10 방송시작</span>
            </CardHeader>
            <CardContent className={styles.container__cardcontent}>
              <Avatar>
                <AvatarImage src="https://profile.img.sooplive.co.kr/LOGO/kh/khm11903/khm11903.jpg" />
                <AvatarFallback>배너</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-xs font-bold">
                  와꾸대장봉준
                </p>
                <p className="text-s">
                  제목입니다
                </p>
              </div>
            </CardContent>
            <CardFooter className={styles.container__cardfooter}>
              <Avatar>
                <AvatarImage src="/images/soop.png" />
                <AvatarFallback>숲</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/images/youtube.png" />
                <AvatarFallback>유튜브</AvatarFallback>
              </Avatar>
            </CardFooter>
          </Card>

          <Card className={styles.container__moosu__list}>
            <CardHeader>
              <CardTitle>무수</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </Card>

        <Card className={styles.container__moomem}>
          <Card className={styles.container__moomem__list}>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>

          <div className={styles.container__moomem__list}>
            <Card className="w-[300px]">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Framework</Label>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
              </CardFooter>
            </Card>
          </div>
          <div className={styles.container__moomem__list}>
            <Card className="w-[300px]">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Framework</Label>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
              </CardFooter>
            </Card>
          </div>
        </Card>
      </main>
      <Button className={`${styles.container__multiviewbutton} ${multiViewButton ? styles.container__multiviewbuttonoff:''}`} onClick={()=> setMultiviewButton(!multiViewButton)}>멀티뷰로 보기</Button>
      <div className={styles.container__multiviewbox}>
        {multiViewButton &&  (
	<div className={styles.container__multiviewbox__Wrap}>
		<div className="flex flex-col flex-1 gap-4">
			<div className="flex items-center gap-2">
				<h3 className="font-bold">멀티뷰 <span className="opacity-50">최대 9개</span></h3>
			</div>
			<div className="flex flex-wrap justify-start gap-4 flex-1">
				<div className={styles.container__multiviewbox__viewbox}>
					<div className={styles.container__multiviewbox__viewimg}>
					</div>
					<div className={styles.container__multiviewbox__viewdec}>
						<h5>방송을 선택하세요!</h5>
						<div className="opacity: 0.5;">
							클릭시 삭제됩니다.
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="flex flex-col gap-2 flex-shrink-0 ml-4">
			<div className="flex flex-col gap-2">
				<div className="flex gap-2">
					<button className={styles.container__multiviewbox__button}>소프트콘 멀티뷰</button>
				</div>
				<button className={styles.container__multiviewbox__button} onClick={()=> setMultiviewButton(false)}>닫기</button>
			</div>
		</div>
	</div>
  )}
</div>



      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
