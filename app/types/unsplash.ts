export type UnsplashPhoto = {
    id: string;
    width: number;
    height: number;
    description?: string;
    alt_description?: string;
    urls: { regular: string; full?: string };
    user: { name: string; links: { html: string } };
    links: { html: string };
};


