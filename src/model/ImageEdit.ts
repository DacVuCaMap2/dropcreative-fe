class ImageEdit {
    id:any;
    productId:any;
    url:string;
    name:string;
    isMain:boolean;
    constructor(id:any, productId:any, url:string, name:string, isMain:boolean) {
        this.id = id;
        this.productId = productId;
        this.url = url;
        this.name = name;
        this.isMain = isMain;
    }
}
export default ImageEdit;