export default function urlReplace (url) {
    const urls = `${url}`
    const link = urls.replace("public", "").replace("\\/g", "/");
    return link;
}