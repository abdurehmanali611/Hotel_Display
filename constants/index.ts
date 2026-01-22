/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchingGallery } from "@/lib/actions";

const FetchedGallery = await FetchingGallery()
const FirstFetchedGallery = FetchedGallery.filter((item: any) => item.galleryType === "First Gallery")
const SecondFetchedGallery = FetchedGallery.filter((item: any) => item.galleryType === "Second Gallery")
const ThirdFetchedGallery = FetchedGallery.filter((item: any) => item.galleryType === "Third Gallery")
const FourthFetchedGallery = FetchedGallery.filter((item: any) => item.galleryType === "Fourth Gallery")
const FifthFetchedGallery = FetchedGallery.filter((item: any) => item.galleryType === "Fifth Gallery")
const SixthFetchedGallery = FetchedGallery.filter((item: any) => item.galleryType === "Sixth Gallery")

const FirstGalleryDummyData = [
  {
    id: 1,
    image: "/assets/atklt.jpg",
    price: 230,
    title: "Atklt",
  },
  {
    id: 2,
    image: "/assets/avocado juice.jpg",
    price: 230,
    title: "Avocado Juice",
  },
  {
    id: 3,
    image: "/assets/beef pizza.jpg",
    price: 230,
    title: "Beef Pizza",
  },
];

const SecondGalleryDummyData = [
  {
    id: 1,
    image: "/assets/chicken beselata.jpg",
    price: 230,
    title: "Chicken Beselata",
  },
  {
    id: 2,
    image: "/assets/chicken curry.jpg",
    price: 230,
    title: "Chicken Curry",
  },
  {
    id: 3,
    image: "/assets/chicken leg.jpg",
    price: 230,
    title: "Chicken Leg",
  },
];

const ThirdGalleryDummyData = [
  {
    id: 1,
    image: "/assets/bombolino.jpg",
    price: 230,
    title: "Bombolino",
  },
  {
    id: 2,
    image: "/assets/bozena shro.jpg",
    price: 230,
    title: "Bozena Shro",
  },
  {
    id: 3,
    image: "/assets/bread.jpg",
    price: 230,
    title: "Bread",
  },
];

const FourthGalleryDummyData = [
  {
    id: 1,
    image: "/assets/burger.jpg",
    price: 230,
    title: "Burger",
  },
  {
    id: 2,
    image: "/assets/chechebsa.jpg",
    price: 230,
    title: "Chechebsa",
  },
  {
    id: 3,
    image: "/assets/cheese burger.jpg",
    price: 230,
    title: "Cheese Burger",
  },
];

const FifthGalleryDummyData = [
  {
    id: 1,
    image: "/assets/chicken beatklt.jpg",
    price: 230,
    title: "Chicken Beatklt",
  },
  {
    id: 2,
    image: "/assets/chicken bepasta.jpg",
    price: 230,
    title: "Chicken Bepasta",
  },
  {
    id: 3,
    image: "/assets/chicken beruz.jpg",
    price: 230,
    title: "Chicken Beruz",
  },
];

const SixthGalleryDummyData = [
  {
    id: 1,
    image: "/assets/chicken koterate.jpg",
    price: 230,
    title: "Chicken Koterate",
  },
  {
    id: 2,
    image: "/assets/chicken salad.jpg",
    price: 230,
    title: "Chicken Salad",
  },
  {
    id: 3,
    image: "/assets/chicken shewarma.jpg",
    price: 230,
    title: "Chicken Shewarma",
  },
];

export const FirstGallery = FirstFetchedGallery.length > 0 ? FirstFetchedGallery : FirstGalleryDummyData;

export const SecondGallery = SecondFetchedGallery.length > 0 ? SecondFetchedGallery : SecondGalleryDummyData;

export const ThirdGallery = ThirdFetchedGallery.length > 0 ? ThirdFetchedGallery : ThirdGalleryDummyData;

export const FourthGallery = FourthFetchedGallery.length > 0 ? FourthFetchedGallery : FourthGalleryDummyData;

export const FifthGallery = FifthFetchedGallery.length > 0 ? FifthFetchedGallery : FifthGalleryDummyData;

export const SixthGallery = SixthFetchedGallery.length > 0 ? SixthFetchedGallery : SixthGalleryDummyData;

export const SelectList = [
  {
    id: 1,
    name: "First Gallery",
    realValue: "First Gallery", 
  },
  {
    id: 2,
    name: "Second Gallery",
    realValue: "Second Gallery", 
  },
  {
    id: 3,
    name: "Third Gallery",
    realValue: "Third Gallery", 
  },
  {
    id: 4,
    name: "Fourth Gallery",
    realValue: "Fourth Gallery", 
  },
  {
    id: 5,
    name: "Fifth Gallery",
    realValue: "Fifth Gallery", 
  },
  {
    id: 6,
    name: "Sixth Gallery",
    realValue: "Sixth Gallery", 
  },
];
