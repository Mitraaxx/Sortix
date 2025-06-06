// src/algorithm/sortingAlgo.js

export function bubbleSort(array) {
  let animation = [];
  let tempArray = [...array];
  for (let i = 0; i < tempArray.length - 1; i++) {
    for (let j = 0; j < tempArray.length - 1 - i; j++) {
      // Compare adjacent elements
      animation.push([j, j + 1, 'compare']);
      if (tempArray[j] > tempArray[j + 1]) {
        // Swap if needed
        animation.push([j, j + 1, 'swap']);
        let temp = tempArray[j];
        tempArray[j] = tempArray[j + 1];
        tempArray[j + 1] = temp;
      }
    }
    // Mark element as sorted
    animation.push([tempArray.length - 1 - i, tempArray.length - 1 - i, 'sorted']);
  }
  return animation;
}

export function selectionSort(array) {
  let animation = [];
  let temp = [...array];
  for (let i = 0; i < temp.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < temp.length; j++) {
      animation.push([minIdx, j, 'compare']);
      if (temp[j] < temp[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      // Swap
      animation.push([i, minIdx, 'swap']);
      [temp[i], temp[minIdx]] = [temp[minIdx], temp[i]];
    }
    animation.push([i, i, 'sorted']);
  }
  return animation;
}

export function insertionSort(array) {
  let animation = [];
  let temp = [...array];
  for (let i = 1; i < temp.length; i++) {
    let key = temp[i];
    let j = i - 1;
    while (j >= 0 && temp[j] > key) {
      animation.push([j, j + 1, 'compare']);
      temp[j + 1] = temp[j];
      animation.push([j + 1, j, 'swap']);
      j = j - 1;
    }
    temp[j + 1] = key;
    animation.push([j + 1, j + 1, 'sorted']);
  }
  return animation;
}




export function quickSort(array) {
  let animations = [];
  let temp = [...array];
  quickSortHelper(temp, 0, temp.length - 1, animations);
  for (let i = 0; i < temp.length; i++) {
    animations.push([i, i, 'sorted']);
  }
  return animations;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    let pi = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push([j, high, 'compare']);
    if (arr[j] < pivot) {
      i++;
      animations.push([i, j, 'swap']);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  animations.push([i + 1, high, 'swap']);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}




// Updated merge sort implementation
export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
  // First, we sort the left half
  // We're passing auxiliaryArray as the main array and mainArray as the auxiliary array
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  
  // Then, we sort the right half
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  
  // Finally, we merge the two halves
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  
  // This is the merge step where we compare elements from both halves
  // and put the smaller one into the main array
  while (i <= middleIdx && j <= endIdx) {
    // These are the values we're comparing; we push them once to color them
    animations.push([i, j, 'compare']);
    
    // We overwrite the value at index k in the original array with the
    // value at index i or j in the auxiliary array
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array
      animations.push([k, auxiliaryArray[i], 'overwrite']);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array
      animations.push([k, auxiliaryArray[j], 'overwrite']);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  // Handle remaining elements in the left half
  while (i <= middleIdx) {
    // These are the values we're comparing; we push them once to color them
    animations.push([i, i, 'compare']);
    
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array
    animations.push([k, auxiliaryArray[i], 'overwrite']);
    mainArray[k++] = auxiliaryArray[i++];
  }
  
  // Handle remaining elements in the right half
  while (j <= endIdx) {
    // These are the values we're comparing; we push them once to color them
    animations.push([j, j, 'compare']);
    
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array
    animations.push([k, auxiliaryArray[j], 'overwrite']);
    mainArray[k++] = auxiliaryArray[j++];
  }
}