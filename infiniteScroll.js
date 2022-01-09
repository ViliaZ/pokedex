



// function startScrollEventlistening(){

//     window.addEventListener('scroll', () => {
// 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;  // returns the element that is the root element of the page (for example <html>)
	
// 	console.log( { scrollTop, scrollHeight, clientHeight });
	
// 	if(clientHeight + scrollTop >= scrollHeight) {
// 		// show the loading animation
//         console.log(clientHeight + scrollTop);

// 		loadingMoreData();
// 	}
// })}

// function loadingMoreData() {
// 	// load more data
    
// console.log('loading was triggered');
// loadPokedex();
// }




// const numSteps = 20.0;

// let boxElement;
// let prevRatio = 0.0;
// let increasingColor = "rgba(40, 40, 190, ratio)";
// let decreasingColor = "rgba(190, 40, 40, ratio)";

// // Set things up
// window.addEventListener("load", (event) => {
//   boxElement = document.querySelector("#targetButton");

//   createObserver();
// }, false);


// function createObserver() {
//     let observer;
  
//     let options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: buildThresholdList()
//     };
  
//     observer = new IntersectionObserver(handleIntersect, options);
//     observer.observe(boxElement);
//   }

//   function buildThresholdList() {
//     let thresholds = [];
//     let numSteps = 2;
  
//     for (let i=1.0; i<=numSteps; i++) {
//       let ratio = i/numSteps;
//       thresholds.push(ratio);
//     }
  
//     thresholds.push(0);
//     return thresholds;
//   }











// let recentScrollY = 0;

// window.onscroll = function () {

//     console.log('recentScrollY', recentScrollY);

//     let currentScrolledOnY = document.getElementById('pokemon-collection').getBoundingClientRect().y;
//     const triggerHeight = window.innerHeight;
//     console.log('triggerHeight', triggerHeight);

//     console.log('currentScrolledOnY', currentScrolledOnY);


//     if (currentScrolledOnY <= recentScrollY) {
//         console.log('fired');
//         recentScrollY += (-triggerHeight/3);
//         loadPokedex();
//     }

// };





