const PLACEHOLDER_BASE = "https://placehold.co";
const UNSPLASH_BASE = "https://images.unsplash.com";

function placeholder(
  size: string,
  background: string,
  foreground: string,
  text: string
) {
  return `${PLACEHOLDER_BASE}/${size}/${background}/${foreground}/png?text=${encodeURIComponent(
    text
  )}`;
}

function unsplashPhoto(photoId: string, width = 1600) {
  return `${UNSPLASH_BASE}/${photoId}?auto=format&fit=crop&fm=jpg&q=78&w=${width}`;
}

export const MOCK_IMAGES = {
  mapBanner: unsplashPhoto("photo-1757825482333-7ba7653a528b"),
  trendingGarden: unsplashPhoto("photo-1765009433753-c7462637d21f"),
  dessertLab: unsplashPhoto("photo-1771332858734-cd487a27d0c4"),
  beautyBar: unsplashPhoto("photo-1760621393386-3906922b0b78"),
  comingMarket: unsplashPhoto("photo-1768321481665-b40705ab11ce"),
  soundStudio: unsplashPhoto("photo-1769117618903-0d0ad84f4db3"),
  picnicPopup: unsplashPhoto("photo-1764852865966-dc9c9e25cba1"),
  closingBeauty: unsplashPhoto("photo-1760862652442-e8ff7ebdd2f8"),
  vintageArchive: unsplashPhoto("photo-1770012117468-9b1ee7aba977"),
  mapScene: placeholder("780x1768", "eef2ff", "844d74", "Seoul Popup Map"),
  mapDetail: placeholder("240x240", "fadaec", "844d74", "MUSINSA"),
  communityProfileA: placeholder("120x120", "e1c8f8", "5f4b73", "MJ"),
  communityProfileB: placeholder("120x120", "f9b4e1", "844d74", "SH"),
  exchangeKeyring: placeholder("360x320", "ffd8ef", "844d74", "Keyring"),
  exchangeMug: placeholder("360x320", "cdefff", "5f4b73", "Mug Set"),
  reviewProfileA: placeholder("120x120", "f9b4e1", "844d74", "BD"),
  reviewProfileB: placeholder("120x120", "e1c8f8", "5f4b73", "LD"),
  reviewMain: placeholder("680x680", "fadaec", "844d74", "Lavender Review"),
  reviewDessert: placeholder("360x360", "ffd8ef", "844d74", "Dessert"),
  reviewSpace: placeholder("360x360", "eef2ff", "5f4b73", "Photo Spot"),
  partnerObject: placeholder("700x512", "fadaec", "844d74", "Object Market"),
  partnerHyundai: placeholder("700x512", "e1c8f8", "5f4b73", "The Hyundai"),
  partnerBeauty: placeholder("700x512", "ffd8ef", "844d74", "Beauty Closet"),
  avatarOne: placeholder("120x120", "f6f2f8", "844d74", "01"),
  avatarTwo: placeholder("120x120", "e1c8f8", "5f4b73", "02"),
  avatarThree: placeholder("120x120", "f9b4e1", "844d74", "03"),
  trendingPostA: placeholder("684x855", "fadaec", "844d74", "Seongsu Tips"),
  trendingPostB: placeholder("616x616", "e1c8f8", "5f4b73", "Weekly Popups"),
  trendingPostC: placeholder("684x384", "ffd8ef", "844d74", "Mate Wanted"),
} as const;
