/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FifthGallery,
  FirstGallery,
  FourthGallery,
  SecondGallery,
  SixthGallery,
  ThirdGallery,
} from "@/constants";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DarkVeil from "@/components/DarkVeil";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";

function MarqueeContent() {
  return (
    <>
      <div className="flex items-start">
        <div className="grid grid-cols-3 items-start gap-16 p-5 w-screen">
          {FirstGallery.map((item: any) => (
            <Card
              key={item.id}
              className="flex flex-col gap-3 items-center p-3"
            >
              <CardHeader className="self-start w-full">
                <CardTitle className="font-serif text-xl font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <AspectRatio ratio={16 / 8.5}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="rounded-xl object-cover"
                />
              </AspectRatio>
              <Badge className="font-serif text-lg px-3 self-end mt-2">
                <span className="font-semibold text-red-500 text-xl">
                  Price:{" "}
                </span>
                {item.price} ETB
              </Badge>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-3 items-start gap-16 p-5 w-screen">
          {SecondGallery.map((item: any) => (
            <Card
              key={item.id}
              className="flex flex-col gap-3 items-center p-3"
            >
              <CardHeader className="self-start w-full">
                <CardTitle className="font-serif text-xl font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <AspectRatio ratio={16 / 8.5}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="rounded-xl object-cover"
                />
              </AspectRatio>
              <Badge className="font-serif text-lg px-3 self-end mt-2">
                <span className="font-semibold text-red-500 text-xl">
                  Price:{" "}
                </span>
                {item.price} ETB
              </Badge>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-3 items-start gap-16 p-5 w-screen">
          {ThirdGallery.map((item: any) => (
            <Card
              key={item.id}
              className="flex flex-col gap-3 items-center p-3"
            >
              <CardHeader className="self-start w-full">
                <CardTitle className="font-serif text-xl font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <AspectRatio ratio={16 / 8.5}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="rounded-xl object-cover"
                />
              </AspectRatio>
              <Badge className="font-serif text-lg px-3 self-end mt-2">
                <span className="font-semibold text-red-500 text-xl">
                  Price:{" "}
                </span>
                {item.price} ETB
              </Badge>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex items-start">
        <div className="grid grid-cols-3 items-start gap-16 p-5 w-screen">
          {FourthGallery.map((item: any) => (
            <Card
              key={item.id}
              className="flex flex-col gap-3 items-center p-3"
            >
              <CardHeader className="self-start w-full">
                <CardTitle className="font-serif text-xl font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <AspectRatio ratio={16 / 8.5}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="rounded-xl object-cover"
                />
              </AspectRatio>
              <Badge className="font-serif text-lg px-3 self-end mt-2">
                <span className="font-semibold text-red-500 text-xl">
                  Price:{" "}
                </span>
                {item.price} ETB
              </Badge>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-3 items-start gap-16 p-5 w-screen">
          {FifthGallery.map((item: any) => (
            <Card
              key={item.id}
              className="flex flex-col gap-3 items-center p-3"
            >
              <CardHeader className="self-start w-full">
                <CardTitle className="font-serif text-xl font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <AspectRatio ratio={16 / 8.5}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="rounded-xl object-cover"
                />
              </AspectRatio>
              <Badge className="font-serif text-lg px-3 self-end mt-2">
                <span className="font-semibold text-red-500 text-xl">
                  Price:{" "}
                </span>
                {item.price} ETB
              </Badge>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-3 items-start gap-16 p-5 w-screen">
          {SixthGallery.map((item: any) => (
            <Card
              key={item.id}
              className="flex flex-col gap-3 items-center p-3"
            >
              <CardHeader className="self-start w-full">
                <CardTitle className="font-serif text-xl font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <AspectRatio ratio={16 / 8.5}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="rounded-xl object-cover"
                />
              </AspectRatio>
              <Badge className="font-serif text-lg px-3 self-end mt-2">
                <span className="font-semibold text-red-500 text-xl">
                  Price:{" "}
                </span>
                {item.price} ETB
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

function HotelBrandingOverlay({ duration = 10 }: { duration?: number }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 text-center space-y-8 p-8 rounded-2xl bg-linear-to-br from-black/60 to-purple-900/40 border border-white/20">
        <div className="relative w-32 h-32 mx-auto">
          <Avatar className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              fill
              loading="eager"
              className="object-cover rounded-xl"
            />
          </Avatar>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider bg-clip-text text-transparent bg-linear-to-r from-white to-amber-200">
          Bereket International Hotel
        </h1>
        <div className="space-y-2 text-lg text-white/80">
          <p>📍 123 Luxury Street, Addis Ababa</p>
          <p>📞 +251 123 456 789</p>
        </div>
        <div className="pt-4">
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-400 to-amber-600"
              style={{
                animation: `shrink ${duration}s linear`,
              }}
            />
          </div>
          <p className="text-sm text-white/60 mt-2">
            Resuming in {duration} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Display() {
  const [showBranding, setShowBranding] = useState(true);
  const [isInitialBranding, setIsInitialBranding] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBranding(false);
      setIsInitialBranding(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleCycleComplete = () => {
    const newCount = cycleCount + 1;
    setCycleCount(newCount);
    if (newCount % 3 === 0) {
      setShowBranding(true);
      setTimeout(
        () => {
          setShowBranding(false);
        },
        isInitialBranding ? 15000 : 10000,
      );
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={45}
          noiseIntensity={0.03}
          scanlineIntensity={0.2}
          speed={0.4}
          scanlineFrequency={0.4}
          warpAmount={0.1}
        />
      </div>

      {!showBranding && (
        <div className="relative z-10 h-full flex items-center">
          <Marquee
            speed={50}
            gradient={false}
            play={true}
            onCycleComplete={handleCycleComplete}
          >
            <MarqueeContent />
          </Marquee>
        </div>
      )}

      {showBranding && (
        <HotelBrandingOverlay duration={isInitialBranding ? 15 : 10} />
      )}

      <div className="absolute bottom-4 right-4 z-30 bg-black/50 text-white/70 text-sm px-3 py-1 rounded">
        Cycle: {cycleCount}
      </div>
    </div>
  );
}
