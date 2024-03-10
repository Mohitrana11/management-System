// Circle:
const circle = document.getElementById('circle');
window.addEventListener('mousemove',(details)=>{
    const xValue = details.pageX;
    const yValue = details.pageY;
    setTimeout(()=>{
        circle.style.top = `${yValue}px`;
        circle.style.left = `${xValue}px`;
    },50);
})


// Carousel Container:

const carouselData = [
  {
    image: '/images/SrinagerImages/Srinagar-Garhwal2.jpg',
    title: 'Srinagar Garhwal',
    description: 'Beauty of Uttrakhand'
  },
  {
    image: '/images/SrinagerImages/nccSrinagar.png',
    title: '',
    description: ''
  },
  {
    image: '/images/SrinagerImages/nccSrinagar1.jpg',
    title: 'National Cadet Course  ',
    description: 'Fight like a warrior!'
  }
];
let currentIndex = 0;
const carouselText = document.querySelector('.carouselText');
const carouselImage = document.querySelector('.carousel img');
function changeCarouselContent() {
    carouselImage.src = carouselData[currentIndex].image;
    carouselText.innerHTML = `
    <h2 >${carouselData[currentIndex].title}</h2>
    <p >${carouselData[currentIndex].description}</p>`;
    currentIndex = (currentIndex + 1) % carouselData.length;
}

setInterval(changeCarouselContent, 3000);

function moveSlide(n) {
        currentIndex += n-1;
    changeCarouselContent();
}


// Count Number: 

const num = document.querySelectorAll('#nums');
const interval = 5000;
num.forEach((value)=>{
  let startValue =0;
  let endValue = parseInt(value.getAttribute("data-val"));
  const duration = Math.floor(interval/endValue);
  let count = setInterval(()=>{
    startValue++;
    value.innerHTML = startValue;
    if(startValue==endValue){
      clearInterval(count);
    }
  },duration)
});


