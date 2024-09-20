export default function base64ToFile(dataURL: string) {
    const arr = dataURL.split(',')
    const mime = arr[0].split(';')[0].split(':')[1]
    const bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'image', {type: mime});
}
