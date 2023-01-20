const previewImages = [
    "https://images.pexels.com/photos/9102235/pexels-photo-9102235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5205221/pexels-photo-5205221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1838564/pexels-photo-1838564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5110943/pexels-photo-5110943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1276237/pexels-photo-1276237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/64231/cows-cow-austria-pasture-sky-64231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/394887/pexels-photo-394887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

export default function previewHandler(image) {
        if (image === "No image listed") {

            const randomNum = Math.floor(Math.random() * previewImages.length);
            image = previewImages[randomNum];
            return image;
        } else {
            return image;
        }
    }
