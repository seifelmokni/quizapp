export class Social {
    private title: string;
    private url: string;
    private img: string;

    constructor(title: string, url: string, img: string) {
        this.setTitle(title);
        this.setUrl(url);
        this.setImg(img);
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        if (title.length < 3) {
            throw new Error('Title has to be more then 3 chars.');
        }

        this.title = title;
    }

    getUrl(): string {
        return this.url;
    }

    setUrl(url: string): void {
        if (url.length < 3) {
            throw new Error('Url has to be more then 3 chars.');
        }

        this.url = url;
    }

    getImg(): string {
        return this.img;
    }

    setImg(img: string): void {
        if (img.length < 3) {
            throw new Error('Img path is invalid.');
        }

        this.img = img;
    }
}
