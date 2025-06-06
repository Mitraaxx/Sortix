import './App.css';
import Visualizer from './control/Visualizer';
import { useState } from 'react';
import Control from './control/Control';
import { 
  bubbleSort, 
  selectionSort, 
  insertionSort, 
  quickSort, 
  mergeSort 
} from './algorithm/sortingAlgo';

function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(100); // Default animation speed (milliseconds)
  const [currentAlgorithm, setCurrentAlgorithm] = useState('');
 
  const handleNewArray = () => {
    if (isSorting) return; // Prevent generating new array during sorting
    
    const newArray = Array.from({length: 30}, () =>
      Math.floor(Math.random() * 500)
    );
    setArray(newArray);
    
    // Reset all bars to default color
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = '#6495ED'; // Cornflower blue - more pleasing default
    }
  };

  const handleSorting = (e) => {
    if (isSorting) return; // Prevent starting new sorting when one is in progress
    
    const sortingMethod = e.target.value;
    if (!sortingMethod || array.length === 0) return;
    
    setCurrentAlgorithm(sortingMethod);
    setIsSorting(true);
    let animationArr = [];
    
    switch(sortingMethod) {
      case 'bubbleSort':
        animationArr = bubbleSort(array);
        break;
      case 'selectionSort':
        animationArr = selectionSort(array);
        break;
      case 'insertionSort':
        animationArr = insertionSort(array);
        break;
      case 'quickSort':
        animationArr = quickSort(array);
        break;
      case 'mergeSort':
        animationArr = mergeSort(array);
        break;
      default:
        setIsSorting(false);
        return;
    }
    
    runAnimation(animationArr);
  };

  const runAnimation = (animations) => {
    const bars = document.getElementsByClassName('bar');
    
    // Reset all bars to default color before starting the animation
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = '#6495ED'; // Cornflower blue
    }
    
    for (let i = 0; i < animations.length; i++) {
      const [indexOne, indexTwo, animationType] = animations[i];
      
      setTimeout(() => {
        // Special handling for merge sort's 'overwrite' animations
        if (animationType === 'overwrite') {
          // For mergeSort, indexOne is the position to change and indexTwo is the new value
          const barOne = bars[indexOne];
          barOne.style.backgroundColor = '#FF4500'; // OrangeRed for overwriting
          barOne.style.height = `${indexTwo}px`;
          barOne.innerText = indexTwo;
          
          // Reset to sorted color after a short delay
          setTimeout(() => {
            barOne.style.backgroundColor = '#32CD32'; // LimeGreen
          }, speed * 0.5);
          
        } else {
          // Handle standard animations for other sorting algorithms
          const barOne = bars[indexOne];
          const barTwo = bars[indexTwo];
          
          switch(animationType) {
            case 'compare':
              barOne.style.backgroundColor = '#FFD700'; // Gold - more vibrant yellow
              barTwo.style.backgroundColor = '#FFD700';
              
              // Reset previous comparison colors after a short delay
              setTimeout(() => {
                if (barOne.style.backgroundColor === 'rgb(255, 215, 0)') { // Gold in RGB
                  barOne.style.backgroundColor = '#6495ED'; // Reset to default blue
                }
                if (barTwo.style.backgroundColor === 'rgb(255, 215, 0)') {
                  barTwo.style.backgroundColor = '#6495ED';
                }
              }, speed * 0.8);
              break;
              
            case 'swap':
              barOne.style.backgroundColor = '#FF4500'; // OrangeRed - more visible than plain red
              barTwo.style.backgroundColor = '#FF4500';
              
              // Swap heights and values
              const tempHeight = barOne.style.height;
              const tempContent = barOne.innerText;
              
              barOne.style.height = barTwo.style.height;
              barOne.innerText = barTwo.innerText;
              
              barTwo.style.height = tempHeight;
              barTwo.innerText = tempContent;
              break;
              
            case 'sorted':
              barOne.style.backgroundColor = '#32CD32'; // LimeGreen - more vibrant green
              break;
              
            default:
              break;
          }
        }
        
        // Reset colors for the next animation
        if (i === animations.length - 1) {
          setTimeout(() => {
            finalizeSorting(bars);
          }, speed);
        }
      }, i * speed);
    }
  };
  
  const finalizeSorting = (bars) => {
    // Mark all as sorted (green) when done with a cascading effect
    for (let i = 0; i < bars.length; i++) {
      setTimeout(() => {
        bars[i].style.backgroundColor = '#32CD32'; // LimeGreen
        
        // Reset sorting state when all bars are processed
        if (i === bars.length - 1) {
          setIsSorting(false);
        }
      }, i * 20);
    }
  };

  // Algorithm description object
  const algorithmDescriptions = {
    bubbleSort: {
      title: "Bubble Sort",
      description: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The process continues until no more swaps are needed.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n) when array is already sorted",
    },
    selectionSort: {
      title: "Selection Sort",
      description: "Selection Sort divides the array into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the beginning of the sorted region.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n²) even if array is sorted",
    },
    insertionSort: {
      title: "Insertion Sort",
      description: "Insertion Sort builds the final sorted array one item at a time. It takes one element from the unsorted part and inserts it into its correct position in the sorted part.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n) when array is already sorted",
    },
    quickSort: {
      title: "Quick Sort",
      description: "Quick Sort picks a 'pivot' element and partitions the array around it so that elements smaller than the pivot are on the left and larger elements are on the right. It then recursively sorts the subarrays.",
      timeComplexity: "O(n log n) average case, O(n²) worst case",
      spaceComplexity: "O(log n)",
      bestCase: "O(n log n)",
    },
    mergeSort: {
      title: "Merge Sort",
      description: "Merge Sort is a 'divide and conquer' algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves. It works by comparing elements from two sorted subarrays and selecting the smaller one to place in the final array. This process continues until all elements are merged into a completely sorted array.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      bestCase: "O(n log n) regardless of initial order",
    },
  };

  // Color legend component
  const ColorLegend = () => {
    return (
      <div className="color-legend">
        <h3>Color Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#6495ED' }}></div>
            <span>Unsorted</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#FFD700' }}></div>
            <span>Comparing</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#FF4500' }}></div>
            <span>Swapping/Overwriting</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#32CD32' }}></div>
            <span>Sorted</span>
          </div>
        </div>
        {currentAlgorithm === 'mergeSort' && (
          <div className="merge-sort-note">
            <p><strong>Note:</strong> For Merge Sort, orange indicates when values are being overwritten during the merge process.</p>
          </div>
        )}
      </div>
    );
  };

  // Algorithm description component
  const AlgorithmDescription = () => {
    if (!currentAlgorithm) return null;
    
    const algo = algorithmDescriptions[currentAlgorithm];
    return (
      <div className="algorithm-description">
        <h2>{algo.title}</h2>
        <p>{algo.description}</p>
        <div className="complexity-info">
          <div><strong>Time Complexity:</strong> {algo.timeComplexity}</div>
          <div><strong>Space Complexity:</strong> {algo.spaceComplexity}</div>
          <div><strong>Best Case:</strong> {algo.bestCase}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Sorting Visualizer</h1>
      <Control
        handleNewArray={handleNewArray}
        handleSorting={handleSorting}
      />  
      <div className="visual-container">
        <ColorLegend />
        <Visualizer array={array} />
      </div>
      {currentAlgorithm && <AlgorithmDescription />}
    </div>
  );
}

export default App;