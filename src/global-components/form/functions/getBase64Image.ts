export default function getBase64Image(imgFile:File) {
    const reader = new FileReader()
    const getResult = () => {
       sessionStorage.setItem('image', String(reader.result))
    }
    reader.readAsDataURL(imgFile)
    reader.addEventListener('loadend', getResult)
}